import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../Utils/Colors';

const SideMenu = () => {
  return (
    <View style={styles.container}>
      <Text>{'SideMenu'}</Text>
    </View>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
