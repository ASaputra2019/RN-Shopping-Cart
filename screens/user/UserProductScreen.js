import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';


const UserProductScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch();
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => <ProductItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        price={itemData.item.price}
        onSelect={() => { }}
      >
        <Button
          color={Colors.primary}
          title="Edit"
          onPress={() => {
          }} />
        <Button
          color={Colors.primary}
          title="Delete"
          onPress={() => {
            dispatch(productsActions.deleteProduct(itemData.item.id))
          }} />
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
    </HeaderButtons>
  };
};


export default UserProductScreen;