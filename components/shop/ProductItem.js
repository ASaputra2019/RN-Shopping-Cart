import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';


import Card from '../UI/Card';

const ProductItem = props => {
  const Touchable = Platform.OS === 'android' && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity

  return (
    <Card style={styles.product}>
      <Touchable onPress={props.onSelect} useForeground>
        <View style={styles.touchable}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: props.image }} style={styles.image} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title} >{props.title}</Text>
            <Text style={styles.price} >$ {props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.action}>
            {props.children}
          </View>
        </View>
      </Touchable>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
    overflow: 'hidden'
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imgContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    padding: 10,
    height: '17%'
  },
  title: {
    fontFamily: 'open-sans-semibold',
    fontSize: 18,
    marginVertical: 1
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#999'
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  }
});

export default ProductItem;