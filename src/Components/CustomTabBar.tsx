import React, { useState } from 'react';
import { FlatList, LayoutAnimation, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import TabItem from './TabItem';
import { Colors } from '../Utils/Colors';
import { BottomTabs } from '../Utils/Const';
import { navigate } from '../Navigation/NavigationServices';
import { RootStackParamList } from '../Navigation/Navigation';
import { moderateScale, scale, verticalScale, WINDOW_WIDTH } from '../Utils/Responsive';

const CustomTabBar = ({
  containerStyle,
  tabs = BottomTabs,
  flContainer,
  animatedBg,
}: {
  containerStyle?: any;
  tabs?: typeof BottomTabs;
  flContainer?: any;
  animatedBg?: any;
}) => {
  const TAB_WIDTH = (WINDOW_WIDTH - scale(40)) / tabs.length;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sharedSelectedIndex = useSharedValue(0);

  const onTabClick = (item: { screen: keyof RootStackParamList }, index: number) => {
    setSelectedIndex(index);
    sharedSelectedIndex.value = withTiming(index);
    navigate(item.screen);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const renderTabItem = ({ item, index }: { item: (typeof BottomTabs)[number]; index: number }) => {
    return (
      <TabItem
        item={item}
        key={`custom-tab-${index}`}
        index={index}
        onTabClickListener={onTabClick}
        isSelected={selectedIndex === index}
        tabWidth={TAB_WIDTH}
      />
    );
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      width: TAB_WIDTH,
      transform: [{ translateX: sharedSelectedIndex.value * TAB_WIDTH }],
    };
  });

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <FlatList
        scrollEnabled={false}
        data={tabs}
        renderItem={renderTabItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode={'never'}
        bounces={false}
        contentContainerStyle={[styles.flContainer, flContainer]}
      />
      <Animated.View style={[styles.animatedBg, animatedBg, rStyle]} />
    </SafeAreaView>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: scale(10),
    justifyContent: 'center',
    marginHorizontal: scale(10),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(40),
    backgroundColor: Colors.whiteF7,
    borderWidth: moderateScale(1),
    borderColor: Colors.primary,
  },
  flContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    justifyContent: 'space-around',
  },
  animatedBg: {
    zIndex: -1,
    left: scale(10),
    alignSelf: 'center',
    position: 'absolute',
    height: verticalScale(45),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(50),
    backgroundColor: Colors.primary,
  },
});
