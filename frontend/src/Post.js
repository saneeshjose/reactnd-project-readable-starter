 import React, {Component} from 'react';

 class Post extends Component {

 	render() {

 		const {title,body,author,category,commentCount,voteScore} = this.props;

 		return <div className="post">
 			<div className="post-title">{title}</div>
 			<div className="post-body">{body}</div>
 			<div className="post-attributes">
	 			<span className="post-attribute">Posted By: {author}</span>
	 			<span className="post-attribute">Category: {category}</span>
	 			<span className="post-attribute">Comments: {commentCount}</span>
	 			<span className="post-attribute">Votes: {voteScore}</span>
	 		</div>

 		</div>
 	}
 }

 export default Post;