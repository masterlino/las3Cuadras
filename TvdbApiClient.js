
export default class TvdbApiClient
{
  static API_KEY = 'fc2849cc17425442e036dea3a6c48bde';
  static BASE_URL = 'https://api.themoviedb.org/3';

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

  getFullURIForImagePath(imagePath)
  {
    return 'https://image.tmdb.org/t/p/original' + imagePath;
  }
}