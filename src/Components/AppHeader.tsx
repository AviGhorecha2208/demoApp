import { Image, StyleSheet, Text, Pressable, View } from 'react-native';
import React from 'react';
import { font, moderateScale, scale, verticalScale } from '../Utils/Responsive';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { Colors } from '../Utils/Colors';
import { Fonts } from '../Assets/Fonts/Fonts';
import { Images } from '../Assets/Images/Images';
import { toggleDrawer } from '../Navigation/NavigationServices';

const AppHeader = ({
  title,
  showBurgerMenu,
  onPressBack,
}: {
  title: string;
  showBurgerMenu?: boolean;
  onPressCart?: () => void;
  onPressBack?: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBurgerMenu && (
          <Pressable onPress={toggleDrawer}>
            <Image source={Images.burgerMenu} style={styles.burgerMenu} resizeMode='contain' />
          </Pressable>
        )}
        {onPressBack && (
          <Pressable onPress={onPressBack}>
            <Image source={Images.arrowLeft} style={styles.burgerMenu} resizeMode='contain' />
          </Pressable>
        )}

        <Text style={CommonStylesFn.text(4, Colors.black, Fonts.bold)}>{title}</Text>
      </View>
      <View style={styles.rightContainer}></View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderBottomWidth: verticalScale(1),
    borderBottomColor: Colors.borderColor,
    height: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  leftContainer: {
    flexDirection: 'row',
    gap: scale(20),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: font(3.5),
    fontWeight: 'bold',
  },
  burgerMenu: {
    tintColor: Colors.black,
    width: moderateScale(25),
    height: moderateScale(25),
  },
  cartImage: {
    tintColor: Colors.black,
    width: moderateScale(25),
    height: moderateScale(25),
  },
  cartCountContainer: {
    position: 'absolute',
    top: -verticalScale(7),
    right: -scale(10),
    backgroundColor: Colors.redD1,
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
