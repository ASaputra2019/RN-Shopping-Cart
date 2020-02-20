import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/order';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let newCartItem 
      if (state.items[addedProduct.id]) {
        newCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1, 
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        newCartItem = new CartItem(
          1, 
          prodPrice, 
          prodTitle, 
          prodPrice
        );
      }
      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id] : newCartItem
        },
        totalAmount: state.totalAmount + prodPrice
      };

    case REMOVE_FROM_CART:
      const selectedItem = state.items[action.pId];
      const currentQtty = selectedItem.quantity;
      let updatedCartItems;
      if (currentQtty > 1) {
        const updatedCartItem = new CartItem(selectedItem.quantity - 1, selectedItem.productPrice, selectedItem.productTitle, selectedItem.sum - selectedItem.productPrice)
        updatedCartItems = { ...state.items, [action.pId]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedItem.productPrice
      };

    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pId]) return state;
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pId].sum
      delete updatedItems[action.pId];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      }
  }
  return state;
};