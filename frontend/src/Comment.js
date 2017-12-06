import React, {Component} from 'react';

import {connect} from 'react-redux';
import {updateComment} from './actions/comment';
import {updatePost, decrementCommentCount} from './actions/post';

import Moment from 'react-moment';

import IconThumbsUp from 'react-icons/lib/fa/hand-o-up';
import IconThumbsDown from 'react-icons/lib/fa/hand-o-down';
import IconUser from 'react-icons/lib/fa/user';
import IconEdit from 'react-icons/lib/fa/pencil-square';
import IconTrash from 'react-icons/lib/fa/trash-o';

import * as ReadableAPI from './ReadableAPI';


class Comment extends Component {

	state = {
		editing : false
	}

	voteUp = () => {
		ReadableAPI.voteComment(this.props.data.id, 'upVote').then( (comment) => {
			this.props.dispatch(updateComment(comment));
		});
	}

	voteDown = () => {
		ReadableAPI.voteComment(this.props.data.id, 'downVote').then( (comment) => {
			this.props.dispatch(updateComment(comment));
		});
	}

	showEditBox = () => {

		this.setState( {
			editing : true
		})
	}

	updateComment = () => {

		this.setState( {
			editing : false
		})

		let updates = {
			timestamp : Date.now(),
			body : this.editInput.value
		}
		ReadableAPI.updateComment(this.props.data.id, updates).then( (comment)=>this.props.dispatch(updateComment(comment)));
	}

	deleteComment = () => {
		console.log('Deleting comment');
		ReadableAPI.deleteComment(this.props.data.id).then( (comment)=> this.props.dispatch(updateComment(comment)) );

		console.log(this.props.data);

		//TODO : Use middleware to accomplish the same
		this.props.dispatch(decrementCommentCount(this.props.data.parentId));
	}

	render() {

		return <div className="post-detail-comment">

			<hr style={{
				borderColor : '#5555551c'
			}}/>
			<div className="comment-tools">
				<span style={{float:'right', fontSize:'1.4em'}}><IconEdit onClick={this.showEditBox}/></span>
				<span style={{float:'right', fontSize:'1.4em'}}><IconTrash onClick={this.deleteComment}/></span>
			</div>
			{!this.state.editing && <div>{this.props.data.body}</div> }
			{this.state.editing && <div>
				<textarea className="comment-inline-edit" defaultValue={this.props.data.body} ref={(edit)=>this.editInput = edit  }></textarea>
				<button className="comment-inline-btn" onClick={this.updateComment}>Update</button>
			</div> }

			<div className="comment-options">
				<span className="comment-option" ><IconThumbsUp onClick={this.voteUp}/><IconThumbsDown onClick={this.voteDown}/> {this.props.data.voteScore}</span>
				<span className="comment-option" ><IconUser/> {this.props.data.author}</span>
				<span className="comment-option" >Last updated <Moment fromNow>{this.props.data.timestamp}</Moment></span>
			</div>
		</div>
	}
}

export default connect()(Comment);