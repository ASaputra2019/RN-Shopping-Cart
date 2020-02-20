import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/order';


const CartScreen = props => {
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    let itemArray = [];
    for (let key in state.cart.items) {
      itemArray.push({ 
        productId: key, 
        productTitle: state.cart.items[key].productTitle, 
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return itemArray.sort((a, b) => a.productId > b.productId);
  });
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.summaryAmount}>$ {cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button 
          title='Order now' 
          color={Colors.accent} 
          disabled={cartItems.length === 0} 
          onPress={() => {
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
          }}
        />
      </View>
      <View>
        <FlatList 
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => <CartItem 
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deleteAble
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId))
            }}
          />}
        />
      </View>
    </View >
  );
};
CartScreen.navigationOptions = {
  headerTitle: 'Your Cart'
};


const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  summaryAmount: {
    color: Colors.primary
  }
});

export default CartScreen;