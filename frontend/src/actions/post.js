import {
	ADD_POST,
	UPDATE_POST,
	DELETE_POST,
	INCREMENT_COMMENT_COUNT,
	DECREMENT_COMMENT_COUNT
} from './types'


export const addPost = (post)=>({
	type : ADD_POST,
	post
})

export const updatePost = (post)=>({
	type : UPDATE_POST,
	post
})

export const deletePost = (post)=>({
	type : DELETE_POST,
	post
})

export const incrementCommentCount = (postid)=>({
	type : INCREMENT_COMMENT_COUNT,
	id : postid
})

export const decrementCommentCount = (postid)=>({
	type : DECREMENT_COMMENT_COUNT,
	id : postid
})