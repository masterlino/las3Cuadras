
import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import yelpApiFetch from './yelpApiFetch';
import BusinessCell from './businessCell';

type Props = {};
export default class BusinessList extends Component<Props> {

    static navigationOptions = {
        title: 'Establecimientos',
    };

    constructor(props){
        super(props)

        this.state = {businesses: [], refreshing: false,};
        this.yelpApiClient = new yelpApiFetch();
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.loadPreferences().then(() => {
          this.setState({refreshing: false});
        });
      }

    componentWillMount(){
        this.loadPreferences(); 
    }
    com

    async loadPreferences(){
        try{
            this.mDistance = await AsyncStorage.getItem('distance');
            this.mResultsLimit = await AsyncStorage.getItem('resultsLimit');
            this.mCheapS = await AsyncStorage.getItem('cheapS') == "1" ? true: false;
            this.mAverageS = await AsyncStorage.getItem('averageS') == "1" ? true: false;
            this.mExpensiveS = await AsyncStorage.getItem('expensiveS') == "1" ? true: false;
            this.mVeryExpensiveS = await AsyncStorage.getItem('veryExpensiveS') == "1" ? true: false;

         
        }
        catch (error){
            console.error(error);
        }
        this.yelpApiClient.getBusinessList(this.mDistance, this.mResultsLimit, this.createPriceParam())
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

    createPriceParam(){
        var pricesStringParameter = ""
        var cadenaVacia = true
        
        if  (this.mCheapS){
            if (cadenaVacia){
                pricesStringParameter += "1"
                cadenaVacia = false
            }
        }
        if (this.mAverageS){
            if (cadenaVacia){
                pricesStringParameter += "2"
                cadenaVacia = false
            }
            else{
                pricesStringParameter += ",2"
            }
        }
        if (this.mExpensiveS){
            if (cadenaVacia){
                pricesStringParameter += "3"
                cadenaVacia = false
            }
            else{
                pricesStringParameter += ",3"
            }
        }
        if (this.mVeryExpensiveS){
            if (cadenaVacia){
                pricesStringParameter += "4"
                cadenaVacia = false
            }
            else{
                pricesStringParameter += ",4"
            }
        }
        return pricesStringParameter;
    }

    render(){
        return (
        <View style={styles.container}>
            <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />
            }
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

