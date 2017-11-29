import React, {Component} from 'react';
import {connect} from 'react-redux';

import Post from './Post';


class Posts extends Component{

	render() {

		return <div className="posts">
			{this.props.posts.map((p)=><Post key={p.id} {...p}/>)}
		</div>
	}
}

const mapStateToProps = (state) =>({
	posts : state.posts,
});

export default connect(mapStateToProps)(Posts);