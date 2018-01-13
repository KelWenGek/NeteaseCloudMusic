import React, { Component } from 'react';
import { render } from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
// import { createBrowserHistory as createHistory } from 'history'

// import { Route } from 'react-router'
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import HomeComp from '@/components/HomeComp.jsx';
// import PlaylistComp from 'PlaylistComp'
// import SongComp from 'SongComp'
import rootReducer from '@/store/index';

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
                <Route path="/" exact component={HomeComp} />
                {/* <Route path="/m/playlist/:id" component={PlaylistComp} />
                <Route path="/m/song/:id" render={(props) => <SongComp store={store} {...props} />} /> */}
            </div>
        </BrowserRouter>
    </Provider>
render(ncm, document.getElementById('app'));

