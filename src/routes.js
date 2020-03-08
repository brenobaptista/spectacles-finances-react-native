import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Expenses from './components/Expenses';
import AddItem from './components/AddItem';
import Login from './components/Login';
import News from './components/News';
import WebNews from './components/WebNews';

const myTabNavigator = createBottomTabNavigator(
  {
    Expenses,
    'Add Item': AddItem,
    News,
  },
  {
    tabBarOptions: {
      activeTintColor: '#000',
      inactiveTintColor: '#5A5A5A',
      style: {
        backgroundColor: '#E0C300',
      },
      showLabel: true,
    },
    initialRouteName: 'Add Item',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const IconComponent = FontAwesome5;
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
  },
);

const Routes = createStackNavigator({
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
  WebNews: {
    screen: WebNews,
    navigationOptions: {
      title: 'News',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#FCDC00',
      },
      headerTintColor: '#000',
    },
  },
});

export default createAppContainer(Routes);
