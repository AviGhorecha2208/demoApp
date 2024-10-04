import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppContainer from '../../Components/AppContainer';
import AppHeader from '../../Components/AppHeader';

const Home = () => {
  return (
    <AppContainer>
      <AppHeader title='Home' showBurgerMenu />
      <Text>Home</Text>
    </AppContainer>
  );
};

export default Home;

const styles = StyleSheet.create({});
