import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';


const StartUpScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogIn = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const parsedUserData = JSON.parse(userData);
      let { token, userId, expireDate } = parsedUserData;
      const expirationDate = new Date(expireDate);
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    }
    tryLogIn();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default StartUpScreen