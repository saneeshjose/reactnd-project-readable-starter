import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import IconThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import IconThumbsDown from 'react-icons/lib/fa/thumbs-o-down';

import * as ReadableAPI from './ReadableAPI';
import  {updatePost} from './actions/post'

 class Post extends Component {

 	upVote = (e) => {

 		e.preventDefault();

		const {id} = this.props;
		ReadableAPI.submitVote(id,'upVote').then((post)=>{
			this.props.dispatch(updatePost(post));
		})
	}

	downVote = (e) => {
		e.preventDefault();

		const {id} = this.props;
		ReadableAPI.submitVote(id,'downVote').then((post)=>{
			this.props.dispatch(updatePost(post));
		})
	}

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
			 			<span className="post-info">
			 				<IconThumbsUp className="post-vote" onClick={this.upVote}/><IconThumbsDown className="post-vote" onClick={this.downVote}/>{voteScore}
			 			</span>
			 		</div>
 			</Link>
 	}
 }

 export default withRouter(connect()(Post));