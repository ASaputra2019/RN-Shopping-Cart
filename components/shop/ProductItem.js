import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';


const ProductItem = props => {
  return <View style={styles.product}>
    <Image source={{ uri: props.image }} style={styles.image} />
    <Text style={styles.title} >{props.title}</Text>
    <Text style={styles.price} >$ {props.price.toFixed(2)}</Text>
    <View style={styles.action}>
      <Button title="View Details" onPress={props.onViewDetail}/>
      <Button title="Go to Cart" onPress={props.onAddToCart}/>
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
  image: {
    width: '100%',
    height: '60%'
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
    alignItems: 'center'
  }
});

export default ProductItem;