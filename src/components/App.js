import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../actions/index';
class App extends React.Component {
  componentDidMount(){
    const {store} = this.props;
    //console.log("in component did mount before" + store.getState());
    store.subscribe(() => {
      this.forceUpdate();
    })
    //console.table(store.getState().list);
    store.dispatch(addMovies(data));
  }
  isMovieFavourite = (movie) =>{
    //console.log(this.props.store.getState().favourites);
    const {favourites} = this.props.store.getState();
    const index = favourites.indexOf(movie);
    if(index === -1){
      //found the movie
      return false;
    }
    return true;
  }
  onChangeTab = (val) =>{
    console.log(val);
    console.log(this.props.store.getState().showFavourites); 
    this.props.store.dispatch(setShowFavourites(val));
    console.log(this.props.store.getState().showFavourites);
  }
  render(){
    const {list, favourites, showFavourites} = this.props.store.getState();
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites?"":'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ?'active-tabs' : ''}`} onClick={() => { console.log("here"); this.onChangeTab(true)}}> Favourites</div>
          </div>
        </div>
        <div className="list">
          {displayMovies.map((movie, index) => {
            // {console.log(index)}
            return(
              <MovieCard 
                movie={movie} 
                key={movie + "-" + index} 
                dispatch={this.props.store.dispatch}
                isFavourite = {this.isMovieFavourite(movie)}
              />
            )
            })}
        </div>
        {displayMovies.length ===0 ?<div className="no-movies">No Movies to Display</div>:'' }
      </div>
    );
  }
}

export default App;
