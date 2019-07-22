
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  Image
} from 'react-native';

import yelpApiFetch from './yelpApiFetch';
import BusinessCell from './businessCell';

type Props = {};
export default class BusinessList extends Component<Props> {

    static navigationOptions = {
        title: 'Establecimientos',
    };

    constructor(props){
        super(props)

        this.state = {businesses: []};
        this.yelpApiClient = new yelpApiFetch()
    }

    componentWillMount(){
        this.yelpApiClient.getBusinessList()
        .then((results) => {
        let businesses = results.businesses || []; 
        let myBusinesses = businesses.map((business) => {
            return { 
            key: business.id.toString(), 
            business: business,
            };
        });

        this.setState({
            businesses: myBusinesses
        });
        
        
        })
        .catch((error) => {
        console.error(error);
        });
    }

    render(){
        return (
        <View style={styles.container}>
            <FlatList
            data= {this.state.businesses}
            renderItem={({item}) => 
            (
                <BusinessCell name={item.business.name} 
                distance={item.business.distance.toFixed(1)}
                image_url={item.business.image_url}
                onPress = {
                    () => {
                        this.props.navigation.navigate('businessDetails',{
                            business: item.business,
                        });
                    }
                }
                />
                
            )}
            
            />
            
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
});

