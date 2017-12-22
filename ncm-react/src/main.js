import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import App from './App';
import rootReducer from '@/store/reducers';

axios.defaults.baseURL = 'http://127.0.0.1:3000/';
// axios.defaults.withCredentials = true;

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const ncm = <Provider store={store}><App /></Provider>
render(ncm, document.getElementById('app'));

