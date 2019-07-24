import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class BusinessCell extends Component
{
  constructor(props){
    super(props);
    this.cellFade = new Animated.Value(0);
    this.cellScaleAnim = new Animated.Value(0);
  }
  

  componentWillMount(){
    Animated.parallel([
      Animated.timing(this.cellFade, {
        toValue: 1,
        duration: 500,
      }),
      Animated.timing(this.cellScaleAnim, {
        toValue: 1,
        duration: 500,
      }),
    ]).start();
    
  }

  render()
  {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor='lightblue'>
        <Animated.View style={[styles.mainContainer, {
          opacity: this.cellFade,
          transform: [
            {
              scale: this.cellScaleAnim,
            }
          ]
        }]}>
          <Image style={styles.image} resizeMode="contain" source={{ uri: this.props.image_url }} />
          <View style={styles.detailContainer}>
            <Text style={styles.titleContainer}>{this.props.name}</Text>
            <Text style={styles.distanceContainer}>{this.props.distance} m</Text>
            <Ionicons style={styles.iconContainer} name="ios-locate" size={20} color='darkblue' />
          </View>
        </Animated.View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#FFFFFF',
    margin: 2,
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'stretch',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    fontFamily: 'Cochin',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'darkblue',
    marginEnd: 10
  },
  distanceContainer: {
    flex: 0.35,
    justifyContent: 'space-around',
    fontSize: 15,
    color: 'black',
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  iconContainer: {
    flex: 0.1,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  image: {
    width: null,
    height: 250,
    resizeMode: 'contain',
  }
});
