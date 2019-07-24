

export default class YelpApiFetch 
{
  static API_KEY = 'Bearer _0jHsCFDOjRE6NUHuOdNCFz86qJMftwiXTzObE5jx_0b612GesLuyGSBhWQvRtBntGL8eCTBMiWhEPCf6YH6c5abkh0rg-0y5RHCEximfdyQfA7FpOIEiJvyN76UXHYx';

  getBusinessList(radius, limit, price, location){
    let url = `https://api.yelp.com/v3/businesses/search?limit=${limit}&radius=${radius}&price=${price}&location=${location}`;
    var myHeaders = new Headers();
    myHeaders.append('Authorization', YelpApiFetch.API_KEY)
    var request = new Request(url, {
        headers: myHeaders
    });
    return fetch(request)
    .then((response) => response.json())
    .then((responseJSON) => ({ 
        businesses: responseJSON.businesses,
    }))
    .catch(err => {
      console.warn(err)
    });



  }

  getBusinessDetails(id){
    let url = `https://api.yelp.com/v3/businesses/${id}`;
    var myHeaders = new Headers();
    myHeaders.append('Authorization', YelpApiFetch.API_KEY)
    var request = new Request(url, {
        headers: myHeaders
    });
    return fetch(request)
    .then((response) => response.json())
    .then((responseJSON) => ({ 
        business: responseJSON,
    }))
    .catch(err => {
      console.warn(err)
    });

  }

}