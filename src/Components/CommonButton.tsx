import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from '../Utils/Responsive';
import { Colors } from '../Utils/Colors';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { Fonts } from '../Assets/Fonts/Fonts';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface CommonButtonProps {
  label: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  disabledStyle?: ViewStyle;
  isDisabled?: boolean;
  isEmpty?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  leftIcon?: any;
}

const CommonButton = ({
  label = '',
  containerStyle = {},
  textStyle = {},
  isDisabled,
  disabledStyle = {},
  isEmpty,
  isLoading,
  onPress,
  leftIcon,
}: CommonButtonProps) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        rStyle,
        isEmpty && styles.emptyContainer,
        containerStyle,
        isDisabled && disabledStyle,
      ]}
    >
      <Pressable
        style={styles.pressableContainer}
        onPress={onPress}
        disabled={isLoading || isDisabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {leftIcon && <Image source={leftIcon} style={styles.leftIcon} />}
        {isLoading ? (
          <ActivityIndicator size={'small'} color={Colors.white} />
        ) : (
          <Text
            style={[
              CommonStylesFn.text(4, isEmpty ? Colors.primary : Colors.white, Fonts.bold),
              textStyle,
            ]}
          >
            {label}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(40),
    width: '100%',
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  leftIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: moderateScale(20),
  },
  pressableContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  emptyContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: moderateScale(1),
  },
});
