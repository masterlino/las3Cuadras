
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch
} from 'react-native';
import Slider from "react-native-slider";
import AsyncStorage from '@react-native-community/async-storage';

export default class Preferences extends Component
{

  state = {
    distance: 2000,
    resultsLimit: 20,
    cheapS: true,
    averageS: true,
    expensiveS: true,
    veryExpensiveS: true,
  };

  static navigationOptions = {
      title: "Configuración",
  };

  constructor(props) {
    super(props);    
  }
  
  componentWillMount() {
    this.loadPreferences();
  }

  async loadPreferences() {
    
    let mDistance = 0;
    let mResultsLimit = 1;
    let mCheapS = true;
    let mAverageS = true;
    let mExpensiveS = true;
    let mVeryExpensiveS = true;


    try{
      mDistance = await AsyncStorage.getItem('distance');
      console.warn(mDistance);
      
      this.setState({distance: parseInt(mDistance, 10)});
      mResultsLimit = await AsyncStorage.getItem('resultsLimit');
      this.setState({resultsLimit: parseInt(mResultsLimit, 10)});
      mCheapS = await AsyncStorage.getItem('cheapS') == "1" ? true: false;
      this.setState({cheapS: mCheapS});
      mAverageS = await AsyncStorage.getItem('averageS') == "1" ? true: false;
      this.setState({averageS: mAverageS});
      mExpensiveS = await AsyncStorage.getItem('expensiveS') == "1" ? true: false;
      this.setState({expensiveS: mExpensiveS});
      mVeryExpensiveS = await AsyncStorage.getItem('veryExpensiveS') == "1" ? true: false;
      this.setState({veryExpensiveS: mVeryExpensiveS});  
    }
    catch (error){
      console.error(error);
    }
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
          onValueChange={value => {
              this.setState({distance: value});
              AsyncStorage.setItem('distance', value);
            }
          }
        />
        <View style={ styles.detailContainer}>
          <Text>
            Establecimientos baratos: {this.state.cheapS.toString()}
          </Text>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleCheap}
            value = {this.state.cheapS}/>
        </View>
        <View style={ styles.detailContainer}>
          <Text>
            Establecimientos medios: {this.state.averageS.toString()}
          </Text>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleAverage}
            value = {this.state.averageS}/>
        </View>
        <View style={ styles.detailContainer}>
          <Text>
            Establecimientos caros: {this.state.expensiveS.toString()}
          </Text>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleExpensive}
            value = {this.state.expensiveS}/>
        </View>
        <View style={ styles.detailContainer}>
          <Text>
            Establecimientos muy caros: {this.state.veryExpensiveS.toString()}
          </Text>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleVeryExpensive}
            value = {this.state.veryExpensiveS}/>
        </View>
          <Text>
            LIMITE DE RESULTADOS (1 - 50): {this.state.resultsLimit}
          </Text>
          <Slider
            value={this.state.resultsLimit}
            minimumValue = {1}
            maximumValue = {50}
            step = {1}
            onValueChange={value => {
                this.setState({ resultsLimit: value });
                AsyncStorage.setItem('resultsLimit', value);
              }
            }
          />
        
        
      </View> 
    );
  }

toggleCheap = (value) => {
    this.setState({cheapS: value});
    AsyncStorage.setItem('cheapS', value);
 }

 toggleAverage = (value) => {
  this.setState({averageS: value});
  AsyncStorage.setItem('averageS', value);
}

toggleExpensive = (value) => {
  this.setState({expensiveS: value});
  AsyncStorage.setItem('expensiveS', value);
}

toggleVeryExpensive = (value) => {
  this.setState({veryExpensiveS: value});
  AsyncStorage.setItem('veryExpensiveS', value);
}
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: "stretch",
    justifyContent: "center"
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

});
