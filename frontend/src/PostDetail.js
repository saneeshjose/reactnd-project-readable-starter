import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import capitalize from 'capitalize';
import Loading from 'react-loading';
import Moment from 'react-moment';

import {connect} from 'react-redux';

import {updatePost, incrementCommentCount, deletePost} from './actions/post';
import {loadComments,addComment,updateComment} from './actions/comment';

import IconThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import IconThumbsDown from 'react-icons/lib/fa/thumbs-o-down';
import IconUser from 'react-icons/lib/fa/user';

import * as ReadableAPI from './ReadableAPI';

import Comment from './Comment';

class PostDetail extends Component {

	state = {
		deleting : false
	}

	componentDidMount = () => {
		let comments = ReadableAPI.getComments(this.props.post.id).then((comments)=>{
			this.props.dispatch(loadComments(comments));
		});
	}

	postComment = () => {
		const {id} = this.props.post;

		ReadableAPI.postComment({
			id : (new Date().getTime()).toString(36),
			timestamp : Date.now(),
			body : this.commentInput.value,
			author : this.commentUser.value,
			parentId : id
		}).then((comment)=>{
			this.commentInput.value = '';
			this.commentUser.value='';
			this.props.dispatch(addComment(comment));
			this.props.dispatch(incrementCommentCount(id))
		});
	}

	upVote = () => {
		const {id} = this.props.post;

		ReadableAPI.submitVote(id,'upVote').then((post)=>{
			this.props.dispatch(updatePost(post));
		})
	}

	downVote = () => {
		const {id} = this.props.post;

		ReadableAPI.submitVote(id,'downVote').then((post)=>{
			this.props.dispatch(updatePost(post));
		})
	}

	deletePost = () => {
		ReadableAPI.deletePost(this.props.post.id).then( (post) => {
			this.props.dispatch(deletePost(post));
		});
	}

	render() {

		const {id,title,body,author,category,commentCount,voteScore,timestamp} = this.props.post;

		return <div>

			{!this.props.post && <Loading delay={200} type='spin' color='#196fe0ba' width={72} height={72} /> }
			{this.props.post && this.props.post.id &&
				<div className="post-detail">

					<div className="post-detail-title">{title}</div>

					<div className="post-detail-details-row">
						<div className="post-detail-vote">
							<IconThumbsUp onClick={this.upVote} style={
								{
									color : 'orange',
									display : 'inline-block',
									fontSize : '1.5em',
									paddingBottom : '0.3em'
								}
							}/>
							<div className="post-detail-votescore">{voteScore}</div>
							<IconThumbsDown onClick={this.downVote} style={
								{
									color : 'grey',
									display : 'inline-block',
									fontSize : '1.5em',
									paddingTop : '0.3em'
								}
							}/>
						</div>
						<div className="post-detail-body">{body}</div>
					</div>

					<div className="post-detail-options-row">
						<div>Posted By <IconUser/><b>{author}</b>, <Moment fromNow>{new Date(timestamp)}</Moment> under <Link to={`/${category}`}>{capitalize(category)}</Link></div>
					</div>
					<div className="post-detail-options-row">
						{
							!this.state.deleting && <button className="post-detail-delete-btn" onClick={()=>{
								this.setState({deleting:true});
							}}>Delete this Post</button>
						}

						{
							this.state.deleting &&
								<div>Are you sure?<Link to={`/${category}`}><button onClick={this.deletePost}>Yes</button></Link>
								<button onClick={()=>{
									this.setState({deleting:false});
								}}>No</button>
								</div>
						}

					</div>

					<div className="post-detail-comments">
						<div className="comment-input-box">
							<textarea placeholder="Add a comment" className="comment-input" ref={(txt)=>{this.commentInput= txt}}/>
							<input placeholder="Your name" className="comment-input" ref={(txt)=>{this.commentUser= txt}}/>
							<button className="comment-post-button" onClick={this.postComment}>Post</button>
						</div>

						{this.props.comments.map((c)=> !c.deleted && <Comment key={c.id} data={c}/> ) }
					</div>
				</div>
			}
		</div>
	}
}

function mapStateToProps(state, props) {
	console.log(state.comments);
	return {
		post : state.posts.find( (p) => p.id === props.match.params.id ),
		comments : state.comments.filter( (c) => c.parentId === props.match.params.id )
	}
}

export default connect(mapStateToProps)(PostDetail);