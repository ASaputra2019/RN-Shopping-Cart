import Order from '../../models/order';
import serverKey from '../../key/key';


export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';


export const fetchOrders = () => {
  return async (dispatch, getState) => {
    let userId = getState().auth.userId;
    try {
      const response = await fetch(`https://rn-shopping-cart-as.firebaseio.com/orders/${userId}.json`, {
        method: 'GET',
      });
      if (!response.ok) { // to forware into catch in case of 400 or 500 status code
        throw new Error('Something went wrong with get request of order');
      }
      const resData = await response.json();
      const loadedOrders = [];
      for (let key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        )
      }
      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders
      });
    } catch (err) {
      throw err;
    }
  }
}

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    let token = getState().auth.token;
    let userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(`https://rn-shopping-cart-as.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      });
    if (!response) {
      throw new Error('something is wrong with POST request of order')
    }
    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    });

  }
};