export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

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