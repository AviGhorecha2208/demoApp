import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors } from '../Utils/Colors';
import { Screens } from '../Utils/Const';
import { replace } from '../Navigation/NavigationServices';
import _ from 'lodash';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { Fonts } from '../Assets/Fonts/Fonts';

const StartupScreen = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      replace(Screens.Drawer);
      clearTimeout(timeout);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={CommonStylesFn.text(4, Colors.primary, Fonts.bold)}>{'Demo App'}</Text>
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
