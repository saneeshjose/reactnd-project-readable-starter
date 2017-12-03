import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
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

	const defaultCategory = {name:'all'};
	const store = createStore(rootReducer, {
		categories : [defaultCategory].concat(data[0].categories),
		posts:data[1],
		uiselections : {selectedCategory:defaultCategory.name}
	});

	ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
	registerServiceWorker();
})