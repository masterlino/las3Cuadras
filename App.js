
import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import BusinessList from './BusinessList'
import BusinessDetails from './BusinessDetails'
import { createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

const RootStack = createStackNavigator({
  businessList: {
    screen: BusinessList,
  },
  businessDetails: {
    screen: BusinessDetails,
  },

});
const RootTab = createBottomTabNavigator({
  Todos: {
    screen: RootStack,
    navigationOptions: {
      title: 'Todos',
      tabBarIcon: () => <Ionicons name="ios-restaurant" size={25} color='darkblue' />,
      tabBarOptions: { activeTintColor:'darkblue', }
      
    }
  },
  Preferencias: {
    screen: RootStack,
    navigationOptions: {
      title: 'Configuración',
      tabBarIcon: () => <Ionicons name="ios-menu" size={25} color='darkblue' />,
      tabBarOptions: { activeTintColor:'darkblue', }
    }
  },
});
const AppContainer = createAppContainer(RootTab);



type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
      <AppContainer />
    );
  }
}
