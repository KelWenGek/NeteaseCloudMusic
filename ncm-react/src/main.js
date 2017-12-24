import React, { Component } from 'react';
import { render } from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
// import createHistory from 'history/createBrowserHistory'
// import { Route } from 'react-router'
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'
import App from './App';
import PlayList from './components/PlayList'
import SongDetail from './components/SongDetail'
import rootReducer from '@/store/reducers';

axios.defaults.baseURL = 'http://127.0.0.1:3000/';


// const history = createHistory()

// const middleware = routerMiddleware(history)


const store = createStore(
    combineReducers({
        ...rootReducer
        // ,
        // router: routerReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
);

const ncm =
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path="/" exact component={App} />
                <Route path="/m/playlist/:id" component={PlayList} />
                <Route path="/m/song/:id" component={SongDetail} />
            </div>
        </BrowserRouter>
    </Provider>
render(ncm, document.getElementById('app'));

