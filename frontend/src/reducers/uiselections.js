import {CHANGE_CATEGORY} from '../actions/uiselections';

export default function uiselections(state={}, action) {
	switch(action.type) {

		case CHANGE_CATEGORY:
			return Object.assign( {}, state, {selectedCategory : action.category} );

		default :
			return state;
	}
}