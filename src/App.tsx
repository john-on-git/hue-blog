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
			//add IDs to the posts
			let blogPosts = [];
			for(let i=0;i<BLOG_POSTS.length;i++)
			{
				blogPosts.push({id:i, title:BLOG_POSTS[i].title, content:BLOG_POSTS[i].content});
			}
			return blogPosts;
		})(),
		visiblePosts: [],
	};

	componentDidMount(): void {
		document.title = CONFIG.BLOG_NAME;
		this.fetchPosts(POSTS_PER_PAGE);
		window.setInterval(
			() => this.setState({hue:this.state.hue+1}),
			100
		)
	}
		
	fetchPosts(n:number) {
		//TODO fetching posts from a microservice might be good as practice 
		this.setState({
			visiblePosts: [...this.state.visiblePosts, ...this.state.allPosts.slice(this.state.visiblePosts.length, this.state.visiblePosts.length + n)],
		});
		console.log("n posts = ",this.state.allPosts.length);
		console.log("n visible posts = ",this.state.visiblePosts.length);
	}
	render(): React.JSX.Element {
		return (
			<div id="main-bar" style={{backgroundColor:ColorDark(this.state.hue)}}>
			  
			  {/*Header With Branding (contains image and blog name)*/}
			  <Header text={this.state.blogName} hue={this.state.hue}></Header>
			  
			  {/*About & Socials (about this blog and contacts, positioned before any posts)*/}
			  <BlogInfo about={this.state.about} contactMethods={this.state.contactMethods} hue={this.state.hue}></BlogInfo>

			  {/*List of Blog Posts*/}
			  <InfiniteScroll
			  	dataLength={this.state.visiblePosts.length}
				next={()=>{this.fetchPosts(POSTS_PER_PAGE)}}
				hasMore={true}

				loader={<p>loading</p>}
				endMessage={<p>end of posts</p>}
			  >
				<div id="posts-list">
					{this.state.visiblePosts.map((post: {id:number, title:string, content:string}) => {
						return <Post key={post.id} title={post.title} content={post.content} hue={this.state.hue}></Post>
					})}
				</div>
			  </InfiniteScroll>
			</div>
		);
	  }
}

export default App;