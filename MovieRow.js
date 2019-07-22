import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class MovieRow extends Component
{
  render()
  {
    return (
	  <TouchableHighlight onPress={this.props.onPress} underlayColor='lightgray'>
        <View style={styles.mainContainer}>
            <Image style={styles.image} resizeMode="contain" source={{ uri: this.props.imageURI }} />
            <View style={styles.titleContainer}>
              <Text>{this.props.title}</Text>
              <Text>{this.props.subtitle}</Text>
            </View>
        </View>
	  </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 75,
  }
});
