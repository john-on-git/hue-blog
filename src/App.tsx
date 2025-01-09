import './App.css';
import React from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CONFIG from './config/config';
import {Post, POST_DATA} from './config/blogPosts';
import {ColorDark} from './colorCalc';
import PostDetails from './components/PostDetails';

class App extends React.Component {
	state = {
		blogName: CONFIG.BLOG_NAME,
		hue: CONFIG.DO_DAYNIGHT_CYCLE ? this.GetTimeHue() : CONFIG.HUE,
		about: CONFIG.ABOUT,
		contactMethods: CONFIG.CONTACT,
		allPosts: (()=> {
			//temp for testing, should be replaced with calls to an API providing the posts
			//add paths add ids to the post
			let blogPosts = [];
			for(let i=0;i<POST_DATA.length;i++)
			{
				blogPosts.push({
					id:i,
					title:POST_DATA[i].title,
					preview:POST_DATA[i].preview,
					HTMLSnippet:POST_DATA[i].HTMLSnippet,
					image: POST_DATA[i].image==null ? null : POST_DATA[i].image
				});
			}
			return blogPosts;
		})(),
		currentlyOpenPost: null
	};

	GetTimeHue()
	{
		function lerp(a:[number,number,number],b:[number,number,number], f:number): [number,number,number] {
			return [
				(a[0]*f) + (b[0]*(1-f)), 
				(a[1]*f) + (b[1]*(1-f)), 
				(a[2]*f) + (b[2]*(1-f))
			];
		}
		//get time
		const now = new Date();
		const sunrise = 7;
		const timeInSeconds = ((now.getHours()-sunrise) * 60 * 60) + (now.getMinutes() * 60) + now.getSeconds();
		
		//rescale it into radians so we can plug it into a trig function, and get a nice wave 
		//the output is our fraction for lerp
		const timeInRadians = timeInSeconds / 86400 * (Math.PI*2);
		const lerpPoint = (Math.sin(timeInRadians)+1)/2;
		
		//lerp between the bright and dark colour
		const midday:[number,number,number]    = [255,193,  0];
		const midnight: [number,number,number] = [ 10, 18, 94];
		let rgbColor = lerp(midday,midnight,lerpPoint);

		//RGB -> HSL formula from Wikipedia
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
		//set the hue based on current time, emulating a day-night cycle
		if(CONFIG.DO_DAYNIGHT_CYCLE)
		{
			window.setInterval(
				() => this.setState({
					hue:this.GetTimeHue(),
				}),
				1000
			)
		}
	}
	setCurrentlyOpenPost = (post:Post|null) => {this.setState({currentlyOpenPost: post})}
	render(): React.JSX.Element {
		return (
			<div id="main-bar" style={{backgroundColor:ColorDark(this.state.hue)}}>
			  
				{/*Header With Branding (contains image and blog name)*/}
				<Header text={this.state.blogName} hue={this.state.hue}></Header>

				{/*List of Blog Posts*/}
				{
					this.state.currentlyOpenPost===null ? 
						<HomePage
							setCurrentlyOpenPost={this.setCurrentlyOpenPost}
							hue={this.state.hue}
							about={this.state.about}
							contactMethods={this.state.contactMethods}
							allPosts={this.state.allPosts}
							postsPerPage={5}
						>
						</HomePage>
					:
					<PostDetails
						setCurrentlyOpenPost={this.setCurrentlyOpenPost}
						post={this.state.currentlyOpenPost}
						hue={this.state.hue}
					>
					</PostDetails>
				}
			</div>
		);
	  }
}

export default App;