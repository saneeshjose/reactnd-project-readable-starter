export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

export const categoryChangedAction = (category)=> ({
	type : CHANGE_CATEGORY,
	category : category.name
});