import React, { useEffect, useState, } from 'react';
import { FlatList, Platform, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/order';
import Colors from '../../constants/Colors';


const OrderScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders())
      .then(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  return isLoading ?
    <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View> :
    (orders.length === 0) ?
      <View style={styles.centered}>
        <Text>No order found, start order some.</Text>
      </View> :

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />}
      />;
};
OrderScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
      <Item
        title='Menu'
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => {
          navData.navigation.toggleDrawer()
        }}
      />
    </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default OrderScreen;