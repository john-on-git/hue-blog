import './App.css';
import React from 'react';
import Post from './components/Post'
import Header from './components/Header';
import BlogInfo from './components/BlogInfo'
import CONFIG from './config/config';
import BLOG_POSTS from './config/blogPosts';
import {ColorDark} from './colorCalc';
import InfiniteScroll from 'react-infinite-scroll-component';

const POSTS_PER_PAGE = 5;

class App extends React.Component {
	state = {
		blogName: CONFIG.BLOG_NAME,
		hue: CONFIG.HUE,
		about: CONFIG.ABOUT,
		contactMethods: CONFIG.CONTACT,
		allPosts: (()=> {
			//temp for testing, should be replaced with calls to an API providing the posts
			//add paths add ids to the post
			let blogPosts = [];
			for(let i=0;i<BLOG_POSTS.length;i++)
			{
				blogPosts.push({
					id:i,
					title:BLOG_POSTS[i].title,
					content:BLOG_POSTS[i].content,
					imagePath: BLOG_POSTS[i].image==null ? null : `src/post_images/${BLOG_POSTS[i].image}`
				});
			}
			return blogPosts;
		})(),
		visiblePosts: [],
	};

	componentDidMount(): void {
		document.title = CONFIG.BLOG_NAME;
		this.fetchPosts(POSTS_PER_PAGE);
	}
		
	fetchPosts(n:number) {
		//TODO fetching posts from a microservice might be good as practice 
		this.setState({
			visiblePosts: [...this.state.visiblePosts, ...this.state.allPosts.slice(this.state.visiblePosts.length, this.state.visiblePosts.length + n)],
		});
	}
	render(): React.JSX.Element {
		return (
			<div id="main-bar" style={{backgroundColor:ColorDark(this.state.hue)}}>
			  
				{/*Header With Branding (contains image and blog name)*/}
				<Header text={this.state.blogName} hue={this.state.hue}></Header>
				
				{/*About & Socials (about this blog and contacts, positioned before any posts)*/}
				<BlogInfo about={this.state.about} contactMethods={this.state.contactMethods} hue={this.state.hue}></BlogInfo>

				<div className="separator"></div>

				{/*List of Blog Posts*/}
				<InfiniteScroll
					dataLength={this.state.visiblePosts.length}
					next={()=>{this.fetchPosts(POSTS_PER_PAGE)}}
					hasMore={this.state.visiblePosts.length!=this.state.allPosts.length}

					loader={<p className="posts-loading">Loading...</p>}
					endMessage={<p className="posts-end">End of posts.</p>}
				>
					<div id="posts-list">
						{this.state.visiblePosts.map((post: {id:number, title:string, content:string, imagePath:string}) => {
							return <Post key={post.id} id={post.id} title={post.title} content={post.content} imagePath={post.imagePath} hue={this.state.hue}></Post>
						})}
					</div>
				</InfiniteScroll>
			</div>
		);
	  }
}

export default App;