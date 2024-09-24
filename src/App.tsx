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
		hue: this.GetTimeHue(),
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

	GetTimeHue()
	{
		function lerp(a:[number,number,number],b:[number,number,number], c:number): [number,number,number] {
			return [
				(a[0]*c) + (b[0]*(1-c)), 
				(a[1]*c) + (b[1]*(1-c)), 
				(a[2]*c) + (b[2]*(1-c))
			];
		}
		const now = new Date();
		const sunrise = 7;
		const timeInSeconds = ((now.getHours()-sunrise) * 60 * 60) + (now.getMinutes() * 60) + now.getSeconds();
		
		const timeInRadians = timeInSeconds / 86400 * (Math.PI*2);
		const lerpPoint = (Math.sin(timeInRadians)+1)/2;
		
		const midday:[number,number,number]    = [255,193,  0];
		const midnight: [number,number,number] = [ 10, 18, 94];
		let rgbColor = lerp(midday,midnight,lerpPoint);
		//RGB -> HSL formula from Wikipedia
		//this is the broken part
		rgbColor = [rgbColor[0]/255, rgbColor[1]/255, rgbColor[2]/255] //r/g/b must be in range 0-1
		const min = Math.min(rgbColor[0], rgbColor[1], rgbColor[2]); 
		if(rgbColor[0]>rgbColor[1] && rgbColor[0]>rgbColor[2]) { //max is red
			const v = rgbColor[0];
			const l = (min + v)/2;
			const c = 2 * (v-l);
			return 60 * (((rgbColor[1]-rgbColor[2])/c)%6); //g-b
		}
		else if(rgbColor[1]>rgbColor[0] && rgbColor[1]>rgbColor[2]) { //max is green
			const v = rgbColor[1];
			const l = (min + v)/2;
			const c = 2 * (v-l);
			return 60 * (((rgbColor[2]-rgbColor[0])/c)+2); //b-r
		}
		else { //max is blue
			const v = rgbColor[2];
			const l = (min + v)/2;
			const c = 2 * (v-l);
			return 60 * (((rgbColor[0]-rgbColor[1])/c)+4); //r-g
		}
	}

	componentDidMount(): void {
		document.title = CONFIG.BLOG_NAME;
		this.fetchPosts(POSTS_PER_PAGE);
		//set the hue based on current time, emulating a day-night cycle
		window.setInterval(
			() => this.setState({
				hue:this.GetTimeHue(),
			}),
			1000
		)
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