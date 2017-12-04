export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';

export const addPost = (post)=>({
	type : ADD_POST,
	post
})

export const updatePost = (post)=>({
	type : UPDATE_POST,
	post
})