import categories from './categories';
import posts from './posts';
import uiselections from './uiselections';

import {combineReducers} from 'redux';

export default combineReducers({
		categories,
		posts,
		uiselections
});