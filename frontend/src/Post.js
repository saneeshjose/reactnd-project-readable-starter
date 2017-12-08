import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import IconThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import IconThumbsDown from 'react-icons/lib/fa/thumbs-o-down';
import IconEdit from 'react-icons/lib/fa/pencil-square';
import IconTrash from 'react-icons/lib/fa/trash-o';

import * as ReadableAPI from './ReadableAPI';
import  {updatePost,deletePost} from './actions/post'

 class Post extends Component {

 	state = {
 		deleting : false
 	}

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

	renderPostOptions = (e) => {

		if ( this.state.deleting) {
			return	<div className="post-options">
						Are you sure? <button onClick={this.deletePost}>Yes</button>
						<button onClick={(e)=>{
							e.preventDefault();
							this.setState({deleting:false});
						}}>No</button>
					</div>
		}
		else {
			return <div className="post-options">
						<IconTrash onClick={(e)=>{ e.preventDefault(); this.setState({deleting:true});}} />
						<IconEdit onClick={(e)=>{
							e.preventDefault();
							this.props.history.push(`/postdetail/${this.props.id}/edit`);
						} }/>
					</div>
		}
	}

	deletePost = (e) => {
		e.preventDefault();

		ReadableAPI.deletePost(this.props.id).then( (post) => {
			this.setState({deleting:false});
			this.props.dispatch(deletePost(post));
		});
	}

 	render() {

 		const {id,title,body,author,category,commentCount,voteScore,timestamp} = this.props;

 		return <Link to={`/${category}/${id}`} className="post">
 					{this.renderPostOptions()}
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