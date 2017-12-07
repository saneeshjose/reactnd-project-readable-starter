import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import capitalize from 'capitalize';

class Categories extends Component {

	render() {

		const {selectedCategory, categories} = this.props;
		return <div className="categories">
			{categories.map((c)=><Link
				key={c.name}
				to={`/${c.name}`}
				className={selectedCategory === c.name? "category-selected": "category"}
				>{capitalize(c.name)}
			</Link>)
		}
		</div>
	}
}

const mapStateToProps = (state, ownProps) =>({
	categories : state.categories,
	selectedCategory : ownProps.location.pathname.slice(1)
});

export default withRouter(connect(mapStateToProps)(Categories));