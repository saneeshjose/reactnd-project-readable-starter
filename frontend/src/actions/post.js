export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const INCREMENT_COMMENT_COUNT = 'INCREMENT_COMMENT_COUNT';
export const DECREMENT_COMMENT_COUNT = 'DECREMENT_COMMENT_COUNT';


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