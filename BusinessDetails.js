
import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  Text,
  View,
  FlatList
} from 'react-native';

import yelpApiFetch from './yelpApiFetch'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
    let name = business.name == null ? "Indefinido." : business.name;
    let phone = business.phone == null ? "Indefinido." : business.phone;
    let is_claimed = business.is_claimed == null ? "Indefinido." : this.BoolToYesNo(business.is_claimed);
    let is_closed = business.is_closed == null ? "Indefinido." : this.BoolToYesNo(business.is_closed);
    let review_count = business.review_count == null ? "Indefinido." : business.review_count;
    let rating = business.rating == null ? "Indefinido." : business.rating;
    let location = business.location.address1 + ", " + business.location.city
    let price = business.price

    return (
      
      <View style={styles.titleContainer}>
        <View style= {styles.cell}><Ionicons style={styles.iconContainer} name="ios-beer" size={20} color='darkblue' /><Text>{name}</Text></View>
        <View style= {styles.cell}><Ionicons style={styles.iconContainer} name="ios-alarm" size={20} color='darkblue' /><Text>Cerrado: {is_closed}</Text></View>
        <View style= {styles.cell}><Ionicons style={styles.iconContainer} name="ios-trophy" size={20} color='darkblue' /><Text>Valoracion: {rating}</Text></View>
        <View style= {styles.cell}><Ionicons style={styles.iconContainer} name="ios-flag" size={20} color='darkblue' /><Text>Revisiones: {review_count}</Text></View>
        <View style= {styles.cell}><Ionicons style={styles.iconContainer} name="ios-call" size={20} color='darkblue' /><Text>{phone}</Text></View>
        <View style= {styles.cell}><Ionicons style={styles.iconContainer} name="ios-cash" size={20} color='darkblue' /><Text>Nivel de Precio: {price}</Text></View>
        <View style= {styles.cell}><Ionicons style={styles.iconContainer} name="ios-walk" size={20} color='darkblue' /><Text>{location}</Text></View>
      </View>
     
    );
  }

  renderMap(business)
  {
      return [];
  }

  BoolToYesNo(value){
    return value ? "Si" : "No";
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
  titleContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  imageScroll: {
    width: 300,
    height: 350,
  },
  iconContainer: {
    marginEnd: 50,
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginEnd: 60,
    marginStart: 40

  }


});
