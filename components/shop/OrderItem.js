import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Colors from '../../constants/Colors';
import CartItem from './CartItem';
import Card from '../UI/Card';


const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>$ {props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails? 'Hide Details' : 'Show Details'}
        onPress={() => setShowDetails(prevState => !prevState)}
      />
      {showDetails && <View style={styles.detailItems}>
        {props.items.map(item => <CartItem
          key={item.productId}
          title={item.productTitle}
          quantity={item.quantity}
          amount={item.sum}
        />)}
      </View>}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 15,
    color: '#888'
  },
  detailItems: {
    width: '100%'
  }
});

export default OrderItem;