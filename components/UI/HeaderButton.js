import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-navigation';

import Colors from '../../constants/Colors';


const CustomHeaderButton = props => {
  return (
    <HeaderButton 
      {...props}
      iconSize={23}
      IconComponent={Ionicons}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
