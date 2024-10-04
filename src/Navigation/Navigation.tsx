import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import _ from 'lodash';
import { Screens } from '../Utils/Const';
import { Home, StartupScreen } from '../Screens';
import { StatusBar } from 'react-native';
import { Colors } from '../Utils/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideMenu from '../Components/SideMenu';
import { widthPx } from '../Utils/Responsive';
import CustomTabBar from '../Components/CustomTabBar';

export type RootStackParamList = {
  Home: undefined;
  StartupScreen: undefined;
  Drawer: undefined;
};

export type DrawerStackParamList = {
  BottomTabs: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const Navigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const Drawer = createDrawerNavigator<DrawerStackParamList>();
  const Tab = createBottomTabNavigator();

  // const AuthStack = () => {
  //   return (
  //     <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
  //       <Stack.Screen name={Screens.LoginWithOtp} component={LoginWithOtp} />
  //       <Stack.Screen name={Screens.LoginWithEmail} component={LoginWithEmail} />
  //       <Stack.Screen name={Screens.EnterOtp} component={EnterOtp} />
  //     </Stack.Navigator>
  //   );
  // };

  const BottomTabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={() => <CustomTabBar />}>
        <Tab.Screen name={Screens.Home} component={Home} />
      </Tab.Navigator>
    );
  };

  const DashboardDrawer = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: widthPx(60) },
          drawerType: 'slide',
        }}
        drawerContent={SideMenu}
      >
        <Drawer.Screen name={Screens.BottomTabs} component={BottomTabNavigator} />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <Stack.Navigator
        initialRouteName={Screens.StartupScreen}
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name={Screens.StartupScreen} component={StartupScreen} />
        <Stack.Screen name={Screens.Drawer} component={DashboardDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
