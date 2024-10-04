import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { Colors } from '../Utils/Colors';

const AppContainer = ({
  children,
  containerStyles,
}: {
  children: React.ReactNode;
  containerStyles?: StyleProp<ViewStyle>;
}) => {
  return <View style={[styles.container, containerStyles || {}]}>{children}</View>;
};

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
