import {CHANGE_CATEGORY} from '../actions/uiselections';

export default function uiselections(state={}, action) {

	console.log( 'Executing action :' + action.type);
	switch(action.type) {

		case CHANGE_CATEGORY:
			return Object.assign( {}, state, {selectedCategory : action.name} );

		default :
			return state;
	}
}