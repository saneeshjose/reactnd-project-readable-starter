import React, {Component} from 'react';
import {connect} from 'react-redux';
import capitalize from 'capitalize';

import {categoryChangedAction} from './actions/uiselections';


class Categories extends Component {

	render() {
		console.log('Rendering Categories');
		return <div className="categories">
			<ul className="categories-list">
				{this.props.categories.map((c)=><li key={c.name} className={this.props.selectedCategory === c.name ? "categories-list-item-selected" : "categories-list-item"} onClick={()=>{
					this.setCategory(c);
				}}>{capitalize(c.name)}</li>)}
			</ul>
		</div>
	}

	setCategory = (c) => {
		this.props.dispatch(categoryChangedAction(c.name));
	}
}


const mapStateToProps = (state) =>({
	categories : state.categories,
	selectedCategory : state.uiselections.selectedCategory
});

export default connect(mapStateToProps)(Categories);