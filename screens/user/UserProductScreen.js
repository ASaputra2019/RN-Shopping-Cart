import React, { useState } from 'react';
import { FlatList, Platform, Button, Alert, View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';


const UserProductScreen = props => {
  
  const userProducts = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch();
  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', { productId: id });
  };
  const deleteHandler = (id) => {
    Alert.alert('You are deleting an item from collection', 'Are you sure you want to delete this?', [
      {text: 'No', style: 'default'},
      {text: 'Yes', style: 'destructive', onPress: () => {
        dispatch(productsActions.deleteProduct(id))
      }}
    ])
  };
  
  if (userProducts.length === 0) {
    return (<View style={styles.centered}>
      <Text>No product found, start create some.</Text>
    </View>);
  }
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData =>
        <ProductItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => { 
            editProductHandler(itemData.item.id)
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id)
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)} 
          />
        </ProductItem>}
    />
  );
};
UserProductScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Product',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
      <Item
        title='Menu'
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => {
          navData.navigation.toggleDrawer()
        }}
      />
    </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
    <Item
      title='Add'
      iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
      onPress={() => {
        navData.navigation.navigate('EditProduct')
      }}
    />
  </HeaderButtons>
  };
};

const styles= StyleSheet.create({
  centered: { 
    flex:1, 
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default UserProductScreen;