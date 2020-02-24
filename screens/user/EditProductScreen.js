import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

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

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK' }])
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input', 'please check the error in the form', [
        { text: 'OK' }
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl)
        )
      } else {
        await dispatch(
          productActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price)
        )
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler]);


  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_UPDATE,
      input: inputIdentifier,
      value: inputValue,
      isValid: inputValidity,
    });
  }, [dispatchFormState]);

  if (isLoading) {
    return (<View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>)
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={100} >
      <ScrollView style={styles.form}>
        <View>
          <Input
            id='title'
            label='Title'
            errorMessage='Please enter a valid title'
            keyboardType='default'
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id='imageUrl'
            label='Image Url'
            errorMessage='Please enter a valid image url'
            keyboardType='default'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null :
            <Input
              id='price'
              label='Price'
              errorMessage='Please enter a valid price'
              onInputChange={inputChangeHandler}
              keyboardType='decimal-pad'
              returnKeyType='next'
              required
              min={0}
            />
          }
          <Input
            id='description'
            label='Description'
            errorMessage='Please enter a valid description'
            keyboardType='default'
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
};
EditProductScreen.navigationOptions = navData => {
  const submitHandle = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId') ?
      'Edit Product' :
      'Add Product',
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item
          title='Save'
          iconName={Platform.OS === 'android' ?
            'md-checkmark' :
            'ios-checkmark'
          }
          onPress={submitHandle}
        />
      </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default EditProductScreen;