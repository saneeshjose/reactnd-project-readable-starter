import React, {Component} from 'react';
import {connect} from 'react-redux';

import Post from './Post';


class Posts extends Component{

	state = {
		sortOrder : 'desc',
		sortBy : 'voteScore'
	}

	changeSort = (e)=> {
		this.setState( {sortBy : e.target.value} );
	}

	render() {

		console.log('Rendering Posts : ' + this.props.selectedCategory );


		const {posts, selectedCategory} = this.props;
		const filteredPosts = selectedCategory === 'all' ? posts : posts.filter((p)=>p.category === selectedCategory );

		filteredPosts.sort((p1,p2)=>p1[this.state.sortBy]-p2[this.state.sortBy]);
		this.state.sortOrder === 'desc' && filteredPosts.reverse();

		return <div className="posts">
			<div className="sort-panel">
				<span>Sort By</span>
				<select onChange={this.changeSort}>
					<option value="voteScore">Votes</option>
					<option value="timestamp">Date</option>
				</select>
			</div>
			{filteredPosts.map((p)=><Post key={p.id} {...p}/>)}
		</div>
	}
}

const mapStateToProps = (state) =>({
	posts : state.posts,
	selectedCategory : state.uiselections.selectedCategory
});

export default connect(mapStateToProps)(Posts);