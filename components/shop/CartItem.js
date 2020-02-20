import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';


const CartItem = props => {
  const Touchable = Platform.OS === 'android' && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.qtty} >
          {props.quantity}{' '}
        </Text>
        <Text style={styles.mainText}>
          {props.title}
        </Text>
      </View>
      <View style={styles.itemData} >
        <Text style={styles.mainText} >$ {props.amount.toFixed(2)} </Text>
        {props.deleteAble && <Touchable style={styles.deleteButton} onPress={props.onRemove} >
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color='red'
          />
        </Touchable>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  qtty: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
    color: '#888',
  },
  mainText: {
    fontFamily: 'open-sans',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20
  }
});

export default CartItem;