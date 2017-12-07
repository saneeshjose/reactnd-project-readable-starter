 import React, {Component} from 'react';
 import {Link} from 'react-router-dom';
 import Moment from 'react-moment';

 class Post extends Component {

 	render() {

 		const {id,title,body,author,category,commentCount,voteScore,timestamp} = this.props;

 		return <Link to={`/${category}/${id}`} className="post">
		 			<div className="post-title">{title}</div>
		 			<div className="post-body">{body}</div>
		 			<div className="post-info-row">
			 			<span className="post-info">Posted By: {author}</span>
			 			<span className="post-info">On: <Moment format="MM/DD/YY HH:MM">{timestamp}</Moment></span>
			 			<span className="post-info">Category: {category}</span>
			 			<span className="post-info">Comments: {commentCount}</span>
			 			<span className="post-info">Votes: {voteScore}</span>
			 		</div>
 			</Link>
 	}
 }

 export default Post;