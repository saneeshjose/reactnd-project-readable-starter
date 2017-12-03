import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import capitalize from 'capitalize';

import {categoryChangedAction} from './actions/uiselections';


class Categories extends Component {

	render() {
		console.log('Rendering Categories');
		return <div className="categories">
			{this.props.categories.map((c)=><Link key={c.name} to={`/${c.name}`}><div className="categories-list-item">{capitalize(c.name)}</div></Link>)}
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