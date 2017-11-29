import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import rootReducer from './reducers/root';

import * as ReadableAPI from './ReadableAPI';

let categories = ReadableAPI.getCategories();
let posts = ReadableAPI.getPosts();

Promise.all([categories,posts]).then((data)=>{

	const store = createStore(rootReducer, {
		categories : data[0].categories,
		posts:data[1]
	});

	console.log( store.getState());

	ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
	registerServiceWorker();
})