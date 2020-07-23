import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware} from 'redux';
import './index.css';
import App from './components/App';
import rootReducer from './reducers/index';

//this dispatch and getstate isnt same as the one we have in store
//function logger(obj, next, action)
//logger(obj)(next)(action)
/*const logger = function({dispatch, getState}){
  return function(next){
    return function(action){
      //middleware code
      console.log('ACTION_TYPE', action.type);
      next(action);
    }
  }
}*/
//another way of writing above code
const logger = ({dispatch, getState}) => (next) => (action) =>{
  //middleware code
  console.log('ACTION_TYPE', action.type);
  next(action);
}
const store = createStore(rootReducer, applyMiddleware(logger));
// console.log("before store",store.getState());
// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{name: "superman"}]
// })
// console.log("after store",store.getState());
ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);

