import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = props => {
  return <View style={styles.product}>
    <View style={styles.imgContainer}>
      <Image source={{ uri: props.image }} style={styles.image} />
    </View>
    <View style={styles.details}>
      <Text style={styles.title} >{props.title}</Text>
      <Text style={styles.price} >$ {props.price.toFixed(2)}</Text>
    </View>
    <View style={styles.action}>
      <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail}/>
      <Button color={Colors.primary} title="Go to Cart" onPress={props.onAddToCart}/>
    </View>
  </View>
};

const styles= StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width:0, height:2 },
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20
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
    height: '15%'
  },
  title: {
    fontSize: 18,
    marginVertical: 4
  },
  price: {
    fontSize: 14,
    color: '#999'
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  }
});

export default ProductItem;