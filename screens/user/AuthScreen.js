import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { View, Button, StyleSheet, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';


const FORM_UPDATE = 'FORM_UPDATE'
const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (let key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [formHasSubmitted, setFormHasSubmitted] = useState(false)
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [signUpMode, setSignUpMode] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false
  });
  const authHandler = async () => {
    if (!formState.formIsValid) {
      setFormHasSubmitted(true);
      return;
    }
  
    let action
    if (signUpMode) {
      action = authActions.signUp(
        formState.inputValues.email, 
        formState.inputValues.password
      );
    } else {
      action = authActions.logIn(
        formState.inputValues.email, 
        formState.inputValues.password
      );
    }
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("ERROR", error, [{ text: 'OK' }])
    }
  }, [error]);

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_UPDATE,
      input: inputIdentifier,
      value: inputValue,
      isValid: inputValidity,
    });
  }, [dispatchFormState]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={30}
      style={styles.screen}
    >
      <LinearGradient 
        colors={['#ffedff', '#ffe3ff']} 
        style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView keyboardShouldPersistTaps='always' >
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
            formHasSubmitted={formHasSubmitted}
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={6}
            errorMessage="Please enter a valid password."
            onInputChange={inputChangeHandler}
            initialValue=""
            formHasSubmitted={formHasSubmitted}
          />
          <View style={styles.button}>
          {isLoading ? <ActivityIndicator size="large" color={Colors.primary} /> :<Button 
            title={signUpMode ? "Sign Up" : "Login"}
            color={Colors.primary}
            onPress={authHandler}
          />}
          </View>
          <View style={styles.button}>
          <Button
            title={`Switch to ${signUpMode ? 'Login' : 'Sign Up'}`}
            color={Colors.accent}
            onPress={() => {
              setSignUpMode(prevState => !prevState)
            }}
          />
          </View>
        </ScrollView>
      </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
};
AuthScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Authenticate'
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  button: {
    marginTop: 10
  }
});

export default AuthScreen;