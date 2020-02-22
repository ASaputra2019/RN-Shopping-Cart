import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://rn-shopping-cart-fc84d.firebaseio.com/products.json', {
        method: 'GET',
      });
      if (!response.ok) { // to forware into catch in case of 400 or 500 status code
        throw new Error('Something went wrong with get request');
      }
      const resData = await response.json();
      const loadedProducts = [];
      for (let key in resData) {
        loadedProducts.push(new Product(
          key,
          'u1',
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        ))
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts })
    } catch (err) {
      // send to custom analytic server
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch) => {
    const response = await fetch(`https://rn-shopping-cart-fc84d.firebaseio.com/products/${productId}.jon`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Something went wrong with delete request');
    }

    dispatch({
      type: DELETE_PRODUCT,
      pId: productId
    });
  }
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => { //redux thunk dispatch before setting a state
    const response = await fetch('https://rn-shopping-cart-fc84d.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // so that firebase know we'd send a json data
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    })
    // .then(resp => {}) // replaced with async await
    // .catch(err => { console.error(err) });
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    const response = await fetch(`https://rn-shopping-cart-fc84d.firebaseio.com/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl
      })
    })

    if (!response.ok) {
      throw new Error('Something went wrong with update request');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pId: id,
      productData: {
        title, description, imageUrl
      }
    });
  }
};