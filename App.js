import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Expenses from './components/Expenses';
import AddItem from './components/AddItem';
import Login from './components/Login';
import News from './components/News';
import OpenNews from './components/OpenNews'

const myTabNavigator = createBottomTabNavigator(
  {
    Expenses: Expenses,
    'Add Item': AddItem,
    News: News,
  },
  {
    tabBarOptions: {
      activeTintColor: '#34495e',
      inactiveTintColor: '#bdc3c7',
      style: {
        backgroundColor: '#ecf0f1',
      },
      showLabel: true,
    },
    initialRouteName: 'Add Item',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = FontAwesome5;
        let iconName;

        if (routeName === 'News') {
          iconName = 'newspaper';
        } else if (routeName === 'Expenses') {
          iconName = 'receipt';
        } else if (routeName === 'Stocks') {
          iconName = 'chart-line';
        } else if (routeName === 'Add Item') {
          iconName = 'plus';
        }

        return <IconComponent name={iconName} size={24} color={tintColor} />;
      },
    }),
  }
);

const LoginNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: myTabNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  OpenNews: {
    screen: OpenNews
  }
});

export default createAppContainer(LoginNavigator);
