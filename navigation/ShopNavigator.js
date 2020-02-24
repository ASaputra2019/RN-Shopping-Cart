import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems, DrawerNavigatorItems } from 'react-navigation-drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/user/StartUpScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans-semibold',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  }, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons
      name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} // cart symbol shown on modal
      size={23}
      color={drawerConfig.tintColor}
    />
  },
  defaultNavigationOptions: defaultNavOptions
}
);

const OrderNavigator = createStackNavigator({
  orders: OrdersScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons
      name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} // list symbol shown on modal
      size={23}
      color={drawerConfig.tintColor}
    />
  },
  defaultNavigationOptions: defaultNavOptions
});

const AdminNavigator = createStackNavigator({
  UserProducts: UserProductScreen,
  EditProduct: EditProductScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons
      name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} // // create symbol shown on modal
      size={23}
      color={drawerConfig.tintColor}
    />
  },
  defaultNavigationOptions: defaultNavOptions
});

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrderNavigator,
  Admin: AdminNavigator,
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  },
  contentComponent: (props) => {
    const dispatch = useDispatch();
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <SafeAreaView forceInset={{ top:'always', horizontal: 'never' }} >
          <DrawerItems {...props} />
          <Button title="Logout" color={Colors.primary} onPress={() => {
            dispatch(authActions.logOut());
            props.navigation.navigate('Auth');
          }} />
        </SafeAreaView>
      </View>
    );
  }
});

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, {
  defaultNavigationOptions: defaultNavOptions
});

const MainNavigator = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
});


export default createAppContainer(MainNavigator);