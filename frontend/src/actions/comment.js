import {
	LOAD_COMMENTS,
	ADD_COMMENT,
	UPDATE_COMMENT
} from './types';

export const loadComments = (comments)=>({
	type : LOAD_COMMENTS,
	comments
})

export const addComment = (comment)=>({
	type : ADD_COMMENT,
	comment
})

export const updateComment = (comment)=>({
	type : UPDATE_COMMENT,
	comment
})