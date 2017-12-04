import {
	LOAD_COMMENTS,
	ADD_COMMENT,
	UPDATE_COMMENT
} from '../actions/comment';

export default function comments(comments=[], action ) {

	switch ( action.type ) {

		case LOAD_COMMENTS :
			return action.comments;

		case ADD_COMMENT :
			return [action.comment].concat(comments);

		case UPDATE_COMMENT :
			//Make a copy and modify the comment to retain the order of comments
			return comments.slice(0).map ( (c)=>c.id === action.comment.id ? action.comment : c );

		default :
			return comments;
	}
}