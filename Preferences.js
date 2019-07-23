
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Slider from "react-native-slider";

export default class Preferences extends Component
{

  state = {
    distance: 2000,
    resultsLimit: 20,
  };

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
      <View style={styles.container}>
        <Text>
          DISTANCIA MAXIMA METROS (50m - 4000m): {this.state.distance}
        </Text>
        <Slider
          value={this.state.distance}
          minimumValue = {50}
          maximumValue = {4000}
          step = {1}
          onValueChange={value => this.setState({ distance: value })}
        />
        <Text>
          LIMITE DE RESULTADOS (1 - 50): {this.state.resultsLimit}
        </Text>
        <Slider
          value={this.state.resultsLimit}
          minimumValue = {1}
          maximumValue = {50}
          step = {1}
          onValueChange={value => this.setState({ resultsLimit: value })}
        />
        
        
      </View> 
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  },

});
