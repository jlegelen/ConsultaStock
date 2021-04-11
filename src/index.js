import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from './ConfigureStore';

const store = configureStore();

console.log("Comenzandoooooooooooo");

ReactDOM.render(
    <Provider store={store}>
        <Home />
    </Provider>,
    document.getElementById('root')
);


