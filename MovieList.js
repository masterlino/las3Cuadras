/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  Text,
  View
} from 'react-native';

import MovieRow from './MovieRow'
import TvdbApiClient from './TvdbApiClient'

export default class MovieList extends Component
{
  static navigationOptions = {
    title: 'Popular Movies',
  };

  constructor(props) {
    super(props);

    this.state = { movies: [] };
    this.apiClient = new TvdbApiClient();
    this.nextPage = 1;
    this.loading = false;
  }
  
  componentWillMount() {
    this.loadNextPage()
  }

  loadNextPage() {
    if (this.loading)
    {
      return;
    }

    this.loading = true;

    this.apiClient.getPopularMovies(this.nextPage)
    .then((result) => {
	  let popularMovies = result.resultMovies;
      let movies = popularMovies.map((movie) => {
        return { key: movie.id.toString(), movie: movie }
      })
      this.setState({ movies: this.state.movies.concat(movies) });
      this.nextPage++;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      this.loading = false;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.movies}
          renderItem={ this.renderRow.bind(this) }
          onEndReached={() => {
            this.loadNextPage();
          }}
          >
        </FlatList>
      </View>
    );
  }

  renderRow(rowInfo) 
  {
    item = rowInfo.item;
    movie = item.movie;

    return (<MovieRow 
      title={movie.title}
      subtitle={movie.release_date}
      imageURI={this.apiClient.getFullURIForImagePath(movie.poster_path)}
      onPress={this.onMoviePressed.bind(this, movie)}
    />);
  }

  onMoviePressed(movie)
  {
    this.props.navigation.navigate('movieDetails', { movie: movie });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f5fcff',
  },
});
