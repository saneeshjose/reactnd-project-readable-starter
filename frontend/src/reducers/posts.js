import {ADD_POST, UPDATE_POST} from '../actions/post'

export default function posts(state=[], action) {
	switch ( action.type ) {
		case ADD_POST :
			return state.concat([action.post]);
		case UPDATE_POST:
			return state.filter( (p)=>p.id!== action.post.id ).concat([action.post]);
		default :
			return state;
	}
}