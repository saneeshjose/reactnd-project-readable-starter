import {
	ADD_POST,
	UPDATE_POST,
	DELETE_POST,
	INCREMENT_COMMENT_COUNT,
	DECREMENT_COMMENT_COUNT
} from '../actions/post'

export default function posts(state=[], action) {

	console.log ('Executing post action :' + action.type);
	console.log (action);

	switch ( action.type ) {
		case ADD_POST :
			return state.concat([action.post]);
		case UPDATE_POST:
			return state.filter( (p)=>p.id!== action.post.id ).concat([action.post]);
		case DELETE_POST :
			return state.filter( (p)=>p.id!== action.post.id );
		case INCREMENT_COMMENT_COUNT:
			return state.map ( (p) => p.id === action.id ? Object.assign({}, p, {commentCount : p.commentCount+1} ) : p );
		case DECREMENT_COMMENT_COUNT:
			return state.map ( (p) => p.id === action.id ? Object.assign({}, p, {commentCount : p.commentCount-1} ) : p );
		default :
			return state;
	}
}