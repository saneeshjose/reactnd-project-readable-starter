import categories from './categories';
import posts from './posts';
import uiselections from './uiselections';
import comments from './comment.js';

import {combineReducers} from 'redux';

export default combineReducers({
		categories,
		posts,
		comments,
		uiselections
});