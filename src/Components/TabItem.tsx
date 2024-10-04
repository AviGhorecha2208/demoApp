import React from 'react';
import { Image, StyleSheet, Text, Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Colors } from '../Utils/Colors';
import { moderateScale, scale, verticalScale } from '../Utils/Responsive';
import { CommonStylesFn } from '../Utils/CommonStyles';

const TabItem: React.FC<{
  item: {
    activeIcon: any;
    inActiveIcon: any;
    label: string;
  };
  index: number;
  isSelected: boolean;
  onTabClickListener: (item: any, index: number) => void;
  tabWidth: number;
}> = ({ item, index, isSelected, onTabClickListener, tabWidth }) => {
  return (
    <Animated.View>
      <Pressable
        accessibilityLabel={`Tab-${index}`}
        activeOpacity={0.8}
        style={[styles.toTabContainer, { width: tabWidth }]}
        onPress={() => {
          onTabClickListener(item, index);
        }}
      >
        <View style={isSelected && styles.tItem}>
          <Image
            style={[styles.iIcon, isSelected && { tintColor: Colors.white }]}
            source={isSelected ? item.activeIcon : item.inActiveIcon}
          />
          {isSelected && <Text style={styles.tTitle}>{item.label}</Text>}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toTabContainer: {
    flex: 1,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    tintColor: Colors.primary,
  },
  tItem: {
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    gap: scale(5),
    borderRadius: 100,
  },
  tTitle: {
    ...CommonStylesFn.text(2.75, Colors.white),
  },
});

export default TabItem;
