import React, {Component} from 'react';

import IconThumbsUp from 'react-icons/lib/fa/hand-o-up';
import IconThumbsDown from 'react-icons/lib/fa/hand-o-down';
import IconUser from 'react-icons/lib/fa/user';

import * as ReadableAPI from './ReadableAPI';


class Comment extends Component {

	voteUp = () => {
		ReadableAPI.voteComment(this.props.id, 'upVote').then( (comment) => {
		});
	}

	voteDown = () => {
		ReadableAPI.voteComment(this.props.id, 'downVote').then( (comment) => {
		});
	}

	render() {

		return <div className="post-detail-comment">

			<hr style={{
				borderColor : '#5555551c'
			}}/>
			<div>{this.props.body}</div>
			<div className="comment-options">
				<span className="comment-icon" ><IconThumbsUp onClick={this.voteUp}/><IconThumbsDown onClick={this.voteDown}/> {this.props.voteScore}</span>
				<span className="comment-icon" ><IconUser/> {this.props.author}</span>
			</div>
		</div>
	}
}

export default Comment;