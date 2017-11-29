import React, {Component} from 'react';
import {connect} from 'react-redux';

import Post from './Post';


class Posts extends Component{

	render() {

		console.log('Rendering Posts : ' + this.props.selectedCategory );

		const {posts, selectedCategory} = this.props;
		const filteredPosts = selectedCategory ? posts.filter((p)=>p.category === selectedCategory ) : posts ;

		return <div className="posts">
			{filteredPosts.map((p)=><Post key={p.id} {...p}/>)}
		</div>
	}
}

const mapStateToProps = (state) =>({
	posts : state.posts,
	selectedCategory : state.uiselections.selectedCategory
});

export default connect(mapStateToProps)(Posts);