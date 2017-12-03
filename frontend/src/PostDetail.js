import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {capitalize} from 'capitalize';
import Loading from 'react-loading';
import Moment from 'react-moment';

import IconThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import IconUser from 'react-icons/lib/fa/user';

import * as ReadableAPI from './ReadableAPI';

import Comment from './Comment';

class PostDetail extends Component {

	state = {

		post : {},
		comments : []
	}

	componentDidMount = () => {

		const {id} = this.props.match.params;

		let post = ReadableAPI.getPost(id);
		let comments = ReadableAPI.getComments(id);

		Promise.all([post,comments]).then( (data)=>{

			this.setState ({
				post : data[0],
				comments : data[1]
			});
		} );
	}

	postComment = () => {

		const {id} = this.props.match.params;

		ReadableAPI.postComment({
			id : (new Date().getTime()).toString(36),
			timestamp : Date.now(),
			body : this.commentInput.value,
			author : this.commentUser.value,
			parentId : id
		}).then((comment)=>{
			console.log('Posted comment : ' + comment.body);
			this.commentInput.value = '';
			this.commentUser.value='';
			this.setState((state)=>({comments : state.comments.concat([comment]) }));
		});
	}

	upVote = () => {

		const {id} = this.props.match.params;

		ReadableAPI.submitVote(id,'upVote').then((response)=>{
			console.log('Submitted vote');
			this.setState({post:response});
		})
	}

	render() {

		console.log( this.state );

		const {id,title,body,author,category,commentCount,voteScore,timestamp} = this.state.post;

		return <div>

			{!this.state.post && <Loading delay={200} type='spin' color='#196fe0ba' width={72} height={72} /> }
			{this.state.post &&
				<div className="post-detail">

					<div className="post-detail-title">{title}</div>

					<div className="post-detail-details-row">
						<div className="post-detail-vote">
							<div className="post-detail-votescore">{voteScore}</div>
							<IconThumbsUp onClick={this.upVote}/>
						</div>
						<div className="post-detail-body">{body}</div>
					</div>

					<div className="post-detail-options-row">
						<div>Posted By <IconUser/><b>{author}</b>, <Moment fromNow>{new Date(timestamp)}</Moment> under <Link to={`/${category}`}>{category}</Link></div>
					</div>

					<div className="post-detail-comments">
						<div className="comment-input-box">
							<textarea placeholder="Add a comment" className="comment-input" ref={(txt)=>{this.commentInput= txt}}/>
							<input placeholder="Your name" className="comment-input" ref={(txt)=>{this.commentUser= txt}}/>
							<button className="comment-post-button" onClick={this.postComment}>Post</button>
						</div>

						{this.state.comments.map((c)=><Comment key={c.id} {...c}/> ) }
					</div>
				</div>
			}
		</div>
	}
}

export default PostDetail;