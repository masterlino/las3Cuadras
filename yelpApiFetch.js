export default class YelpApiFetch
{
  static API_KEY = 'Bearer _0jHsCFDOjRE6NUHuOdNCFz86qJMftwiXTzObE5jx_0b612GesLuyGSBhWQvRtBntGL8eCTBMiWhEPCf6YH6c5abkh0rg-0y5RHCEximfdyQfA7FpOIEiJvyN76UXHYx';
  static BASE_URL = 'https://api.yelp.com/v3/businesses/';

  
  getBusinessList(){
    let url = `https://api.yelp.com/v3/businesses/search?latitude=37.4220107&longitude=-122.0840239&limit=50&radius=4000&price=1,2,3,4`;
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
  
  getPopularMovies(page) 
  {
    let url = `${TvdbApiClient.BASE_URL}/movie/popular?page=${page}&api_key=${TvdbApiClient.API_KEY}`;
    console.log(url);
    return fetch(url)
    .then((response) => response.json())
    .then((responseJSON) => ({ 
      resultMovies: responseJSON.results,
      numberOfPages: responseJSON.total_pages,
    }));
  }

  getUpcomingMovies(page) 
  {
    let url = `${TvdbApiClient.BASE_URL}/movie/upcoming?page=${page}&api_key=${TvdbApiClient.API_KEY}`;
    console.log(url);
    return fetch(url)
    .then((response) => response.json())
    // Always return total_pages=1 to avoid nasty bug/behavior where we get duplicated results
    // in subsequent pages.
    //
    .then((responseJSON) => ({ 
      resultMovies: responseJSON.results,
      numberOfPages: 1,
    }));
  }

  getMovieDetails(movieID)
  {
    let url = `${TvdbApiClient.BASE_URL}/movie/${movieID}?api_key=${TvdbApiClient.API_KEY}`;
    console.log(url);
    return fetch(url)
    .then((response) => response.json())
  }

}