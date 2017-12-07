import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import capitalize from 'capitalize';
import Moment from 'react-moment';

import {connect} from 'react-redux';

import {updatePost, incrementCommentCount, deletePost} from './actions/post';
import {loadComments,addComment} from './actions/comment';

import IconThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import IconThumbsDown from 'react-icons/lib/fa/thumbs-o-down';
import IconUser from 'react-icons/lib/fa/user';
import IconEdit from 'react-icons/lib/fa/pencil';

import * as ReadableAPI from './ReadableAPI';

import Comment from './Comment';

class PostDetail extends Component {

	state = {
		deleting : false,
		editingTitle: false,
		editingBody : false
	}

	componentDidMount = () => {
		ReadableAPI.getComments(this.props.post.id).then((comments)=>{
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

	showEditTitleBox = () => {
		this.setState({
			editingTitle : true
		})
	}


	showEditBodyBox = () => {
		this.setState({
			editingBody : true
		})
	}

	updateTitle = () => {
		ReadableAPI.updatePost(this.props.post.id, {title:this.titleInput.value}).then( post =>{
			this.props.dispatch(updatePost(post));
			this.setState({editingTitle:false})
		})
	}

	updateBody = () => {
		ReadableAPI.updatePost(this.props.post.id, {body:this.bodyInput.value}).then( post =>{
			this.props.dispatch(updatePost(post));
			this.setState({editingBody:false});
		})
	}

	render() {

		const {title,body,author,category,voteScore,timestamp} = this.props.post;
		const {comments} = this.props;
		const {editingTitle,editingBody,deleting} = this.state;

		return <div>
			{
				<div className="post-detail">

					{ !editingTitle && <div className="post-detail-title">{title} <IconEdit onClick={this.showEditTitleBox}/></div>}

					{ editingTitle && <div className="post-detail-title">
							<input type="text" className="post-detail-edit-title-input" defaultValue={title} ref={(txt)=>this.titleInput=txt}/>
							<button className="update-btn" onClick={this.updateTitle}>Update</button>
						</div>
					}

					<div className="post-detail-details-row">
						<div className="post-detail-vote">
							<IconThumbsUp onClick={this.upVote} className="post-detail-vote-up"/>
							<div className="post-detail-votescore">{voteScore}</div>
							<IconThumbsDown onClick={this.downVote} className="post-detail-vote-down"/>
						</div>

						{ !editingBody && <div className="post-detail-body">{body} <IconEdit onClick={this.showEditBodyBox}/></div>}
						{ editingBody && <div className="post-detail-body">
							<textarea defaultValue={body} className="post-detail-edit-body-input" ref={(txt)=>this.bodyInput=txt}/>
							<button className="update-btn" onClick={this.updateBody}>Update</button>
						</div>}

					</div>

					<div className="post-detail-options-row">
						<div>Posted By <IconUser/><b>{author}</b>, <Moment fromNow>{new Date(timestamp)}</Moment> under <Link to={`/${category}`}>{capitalize(category)}</Link></div>
					</div>
					<div className="post-detail-options-row">
						{
							!deleting && <button className="post-detail-delete-btn" onClick={()=>{
								this.setState({deleting:true});
							}}>Delete this Post</button>
						}

						{
							deleting &&
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

						<div className="post-detail-comments-header">{comments.length} comment{comments.length>1?'s':''} </div>
						{comments.map((c)=> !c.deleted && <Comment key={c.id} data={c}/> ) }
					</div>
				</div>
			}
		</div>
	}
}

const mapStateToProps = (state, props) => ({
	post : state.posts.find( (p) => p.id === props.match.params.id ),
	comments : state.comments.filter( (c) => c.parentId === props.match.params.id )
});

export default connect(mapStateToProps)(PostDetail);