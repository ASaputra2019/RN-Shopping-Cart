import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';


const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR: 
      return {
        ...state,
        touched: true
      };
    default: 
      return state;
  }
};

const Input = props => {
  const { onInputChange, id, initiallyValid, initialValue, min, max, minLength, required, label, errorMessage } = props
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initiallyValid,
    touched: false
  });
  
  useEffect(() => {
    dispatch({ type: INPUT_CHANGE, value: initialValue, isValid: true });
  }, [initialValue]);

  useEffect(() => {
    onInputChange(id, inputState.value, inputState.isValid)
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min != null && +text < min) {
      isValid = false;
    }
    if (max != null && +text > max) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR })
  };

  return (
    <View style={styles.formContainer} >
      <Text style={styles.label} >{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid 
      && (inputState.touched || props.formHasSubmitted)
      && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-semibold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderWidth: 1
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13
  }
});

export default Input;
