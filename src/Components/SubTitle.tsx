import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import React from 'react';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { Colors } from '../Utils/Colors';
import { scale } from '../Utils/Responsive';
import { Fonts } from '../Assets/Fonts/Fonts';

interface SubTitleProps {
  label: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const SubTitle = ({ label, containerStyle, textStyle }: SubTitleProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[CommonStylesFn.text(4, Colors.grey34, Fonts.regular), styles.label, textStyle]}>
        {label}
      </Text>
    </View>
  );
};

export default SubTitle;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: scale(10),
  },
  label: {
    letterSpacing: 0.5,
  },
});
