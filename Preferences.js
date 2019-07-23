
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Preferences extends Component
{
  static navigationOptions = {
      title: "Configuración",
  };

  constructor(props) {
    super(props);

    
  }
  
  componentWillMount() {
    
  }

  render() {
    return (
      <View>
        <Text contentContainerStyle={styles.container}>
          hola
        </Text>
      </View> 
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

});
