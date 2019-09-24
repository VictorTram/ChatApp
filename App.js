import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {ChatScreen} from './components/ChatScreen';
import {HomeScreen} from './components/HomeScreen';

const MainNavigator = createStackNavigator({
  Home: HomeScreen,
  Chat: ChatScreen
});

class Navigator extends React.Component{
  render(){
    return <MainNavigator/>
  }
}

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;