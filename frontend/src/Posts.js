import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import Loading from 'react-loading';
import capitalize from 'capitalize';

import * as ReadableAPI from './ReadableAPI';

import Post from './Post';
import {addPost} from './actions/post';

class Posts extends Component{

	constructor ( props ) {
		super ( props );

		this.state = {
			sortOrder : 'desc',
			sortBy : 'voteScore',
			modalShown : false,
			loading : false,
			title : '',
			content : '',
			user : '',
			category : ''
		}
	}

	changeSort = (e)=> {
		this.setState( {sortBy : e.target.value} );
	}

	submitPost = () => {

		//Show loading
		this.setState({loading:true});

		console.log(this.state);

		//Post data to service
		ReadableAPI.submitPost({
			id : (new Date().getTime()).toString(36),
			timestamp : Date.now(),
			title : this.state.title,
			body : this.state.content,
			author : this.state.user,
			category : this.state.category
		}).then((response)=>{

			//Once post is successful,add the post to store, dismiss loading, close modal
			this.props.dispatch(addPost(response));

			setTimeout(()=>{
				this.setState({
					modalShown:false,
					loading : false
				})
			},500);
		})
	}

	onFormInputChange = (e) => {
		this.setState({
			[e.target.id] : e.target.value
		})
	}

	render() {

		const {posts} = this.props;
		const {category} = this.props.match.params;

		console.log('Rendering Posts : ' + category );

		const filteredPosts = !category? posts : posts.filter((p)=>p.category === category );

		filteredPosts.sort((p1,p2)=>p1[this.state.sortBy]-p2[this.state.sortBy]);
		this.state.sortOrder === 'desc' && filteredPosts.reverse();

		return <div className="posts">

			<div className="menu-item-right">
              <button className="btn-submit-post" onClick={()=>{
              	this.setState({modalShown:true});
              }}>Submit Post</button>
            </div>

			<div className="sort-panel">
				<span>Sort By</span>
				<select onChange={this.changeSort}>
					<option value="voteScore">Votes</option>
					<option value="timestamp">Date</option>
				</select>
			</div>
			{filteredPosts.map((p)=><Post key={p.id} {...p}/>)}

			{this.state.modalShown && <Modal
				isOpen={this.state.modalShown}
				onRequestClose={()=>{this.setState({modalShown:false});}}
				ariaHideApp={false}
				contentLabel="Submit Post"
				style = {{
					content : {
						background : '#fff',
						borderColor : '#85c0e4',
						width : '40%',
						height : '22em',
						left : '30%',
						top : '20%',
						paddingRight : '40px'
					}
				}}
				>
				<h2>Submit Post</h2>
				<div className="submit-form">
					<div>
						<select placeholder="Select a category" className="form-input-control" id='category' value={category} onChange={this.onFormInputChange}>
							{ this.props.categories.map( (c) => <option value={c.name} key={c.name}>{capitalize(c.name)}</option> ) }
						</select>
					</div>
					<div><input type="text" placeholder="Your name" className="form-input-control" id='user' value={this.state.user} onChange={this.onFormInputChange}/></div>
					<div><input type="text" placeholder="Title" className="form-input-control" id='title' value={this.state.title} onChange={this.onFormInputChange}/></div>
					<div><textarea placeholder="Your content here" className="form-input-control" style={{height:'8em'}} id='content' value={this.state.content} onChange={this.onFormInputChange}/></div>
					<div><button className="form-button-control" onClick={()=>{
						this.submitPost();
					}}>Post{this.state.loading&&<Loading delay={200} type='spin' color='#196fe0ba' className='loading-btn-class' width={24} height={24} />}</button></div>
				</div>
			</Modal> }
		</div>
	}
}

const mapStateToProps = (state) =>({
	posts : state.posts,
	categories : state.categories
});

export default connect(mapStateToProps)(Posts);