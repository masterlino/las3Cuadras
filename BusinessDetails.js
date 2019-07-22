/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  View,
  ListView,
  FlatList
} from 'react-native';

import yelpApiFetch from './yelpApiFetch'

export default class BusinessDetails extends Component
{
  static navigationOptions = ({ navigation }) => {

    params = navigation.state.params;

    return {
      title: params.business.name,
    };
  };

  constructor(props) {
    super(props);

    params = props.navigation.state.params;
    this.businessID = params.business.id;
    this.state = { business: params.business, photosUrl: []};
    this.apiClient = new yelpApiFetch();
  }
  
  componentWillMount() {
    this.apiClient.getBusinessDetails(this.businessID)
    .then((myBusiness) => {
      let myPhotos = myBusiness.business.photos.map((photo) => {
        return { 
        key: photo, 
        photoUrl: photo,
        };
      });
      this.setState({ business: myBusiness.business, photosUrl: myPhotos });
    })
    .catch((error) => { console.error(error) });
  }

  render() {
    business = this.state.business;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderHeader(business)}
        {this.renderOverview(business)}
        {this.renderMap(business)}
      </ScrollView>
    );
  }

  renderHeader(business)
  {
   //alert(this.state.photosUrl)
    
    return (
    <View style={styles.headerContainer}>
       <FlatList horizontal={true}
        style={{flex:1}}
        data={this.state.photosUrl}
        renderItem={(data) => <Image style={styles.imageScroll} resizeMode="contain" source={{ uri: data.item.key}} />}/>
    </View>
    );
  }

  renderOverview(business)
  {
    return (
      
      <View style={styles.titleContainer}>
        <Text>{business.name}</Text>
        <Text>{business.phone}{business.price}</Text>
        <Text style={styles.item}>
        {business.is_closed.toString()}
      </Text>
      </View>
     
    );
  }

  renderMap(business)
  {
    if (business.genres == null)
    {
      return [];
    }

    return (
      <View style={[styles.item, styles.dataContainer]}>
        <Text style={styles.dataTitle}>
          Genre: 
        </Text>
        {business.genres.map((genre) => {
          return (
            <Text style={styles.genre} key={genre.id}>
              {genre.name}
            </Text>
          )
        })
        }
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
  headerContainer: {
    flex: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 0,
  },
  item: {
    marginVertical: 5,
  },
  dataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dataTitle: {
    fontWeight: 'bold',
  },
  genre: {
    paddingHorizontal: 2,
    marginHorizontal: 2,
    marginVertical: 1,
    backgroundColor: 'lightgray'
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 250,
  },
  imageScroll: {
    width: 300,
    height: 350,
  },


});
