const API = 'https://acme-users-api-rev.herokuapp.com/api';
import ConnectedNotes from './Notes.js'

//simulation of logged in user
const fetchUser = async ()=> {
  const storage = window.localStorage;
  const userId = storage.getItem('userId'); 
  if(userId){
    try {
      return (await axios.get(`${API}/users/detail/${userId}`)).data;
    }
    catch(ex){
      storage.removeItem('userId');
      return fetchUser();
    }
  }
  const user = (await axios.get(`${API}/users/random`)).data;
  storage.setItem('userId', user.id);
  return  user;
};

import React from 'react';
import ReactDOM from 'react-dom';
import thunks from 'redux-thunk';
import { HashRouter, Link, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import axios from 'axios';

//constants
const SET_AUTH = 'SET_AUTH';
const SET_NOTES = 'SET_NOTES';
const NEWNOTE = 'NEWNOTE'


//action creators
const setAuth = (auth)=> ({ type: SET_AUTH, auth });
const setNotes = (notes)=> ({ type: SET_NOTES, notes });

// don't understand why I need action creators for posting and deleting
// const newNote = () => ({
//   type: NEWNOTE,
//   // something
// })

//thunks
const getAuth = ()=> {
  return async(dispatch)=> {
    const auth = await fetchUser();
    await dispatch(setAuth(auth));
    return dispatch(getNotes());
  };
};

const getNotes = ()=> {
  return async(dispatch, getState)=> {
    const notes = (await axios.get(`${API}/users/${getState().auth.id}/notes`)).data;
    return dispatch(setNotes(notes));
  };
};

const createNote = (note) => {
  return async(dispatch, getState) => {
    // console.log(note);
    await axios.post(`${API}/users/${getState().auth.id}/notes`, note);
    const notes = (await axios.get(`${API}/users/${getState().auth.id}/notes`)).data;
    return dispatch(setNotes(notes))
  }
}

const deleteNote = id => {
  return async (dispatch, getState) => {
    await axios.delete(`${API}/users/${getState().auth.id}/notes/${id}`);
    const notes = (await axios.get(`${API}/users/${getState().auth.id}/notes`)).data;
    return dispatch(setNotes(notes));
  }
}

//store
const store = createStore(
  combineReducers({
    auth: (state = {}, action)=> {
      if(action.type === SET_AUTH){
        return action.auth;
      }
      return state;
    },
    notes: (state = [], action)=> {
      if(action.type === SET_NOTES){
        return action.notes;
      }
      if (action.type === NEWNOTE) {
        return action.notes;
      }
      return state;
    }
  }), applyMiddleware(thunks)
);


const { render } = ReactDOM;
const { Component } = React;

const _Nav = ({ auth, notes })=> {
  return (
    <div>
      <nav>
        <Link to='/notes'>Notes ({ notes.length })</Link>
      </nav>
      <h1>Welcome { auth.fullName }</h1>
    </div>
  );
};

const Nav = connect(
  ({ auth, notes })=> {
    return {
      auth,
      notes
    };
  }
)(_Nav);

class _App extends Component{
  componentDidMount(){
    this.props.fetchUser()
  }
  render(){
    return (
      <HashRouter>
        <Route component={ Nav } />
        <Route path='/notes' component = { ConnectedNotes } exact />
      </HashRouter>
    );
  }
}

const App = connect(({ auth })=> {
  return {
    auth
  };
}, (dispatch)=> {
  return {
    fetchUser: ()=> dispatch(getAuth())
  };
})(_App);

const root = document.querySelector('#root');
render(<Provider store={ store }><App /></Provider>, root);

export { createNote, deleteNote };