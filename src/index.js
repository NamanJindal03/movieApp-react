import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './components/App';
import movie from './reducers/index';

const store = createStore(movie);
console.log("before store",store.getState());
store.dispatch({
  type: 'ADD_MOVIES',
  movies: [{name: "superman"}]
})
console.log("after store",store.getState());
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

