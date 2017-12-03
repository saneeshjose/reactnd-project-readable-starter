import React, {Component} from 'react';

import IconThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import IconUser from 'react-icons/lib/fa/user';



class Comment extends Component {

	render() {

		return <div className="post-detail-comment">

			<hr/>
			<div>{this.props.body}</div>
			<div className="comment-options">
				<span className="comment-icon" ><IconThumbsUp/> {this.props.voteScore}</span>
				<span className="comment-icon" ><IconUser/> {this.props.author}</span>
			</div>
		</div>
	}
}

export default Comment;