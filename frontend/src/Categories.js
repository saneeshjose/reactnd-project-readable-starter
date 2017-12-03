import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import capitalize from 'capitalize';

import {categoryChangedAction} from './actions/uiselections';


class Categories extends Component {

	state = {
		selected : 'none'
	}

	changeCategory = (category) => {

		this.setState({
			selected : category
		})
	}

	render() {
		console.log('Rendering Categories : ' + this.state.selected);
		return <div className="categories">
			{this.props.categories.map((c)=><Link
				key={c.name}
				to={`/${c.name}`}
				className={this.state.selected === c.name? "category-selected": "category"}
				onClick={()=>this.changeCategory(c.name)}>{capitalize(c.name)}
			</Link>)
		}
		</div>
	}
}


const mapStateToProps = (state) =>({
	categories : state.categories
});

export default connect(mapStateToProps)(Categories);