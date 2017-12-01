import {ADD_POST} from '../actions/post'

export default function posts(state=[], action) {
	switch ( action.type ) {
		case ADD_POST :
			return state.concat([action.post]);
		default :
			return state;
	}
}