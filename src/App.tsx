import './App.css';
import React from 'react';
import headerImage from './header.png';
import CONFIG from './config';
import BLOG_POSTS from './blogPosts';

class App extends React.Component {
	componentDidMount(): void {
		document.title = CONFIG.BLOG_NAME;
	}
	render(): React.JSX.Element {
		return (
			<div id="main-bar" className="color-dark">
			  
			  {/*Header With Branding (contains image and blog name)*/}
			  <header>
				  <img id="header-image" src={headerImage}></img>
				  <h1 id="header-text">{CONFIG.BLOG_NAME}</h1>
			  </header>
			  
			  {/*About & Socials (about this blog and contacts, positioned before any posts)*/}
			  <div id="blog-info" className="flex-horizontal">
				  <div id="about-container" className="color-light">
					  <h2 id="about-title">About</h2>
					  <p id="about-body">{CONFIG.ABOUT}</p>
				  </div>
				  <div id="contacts-list" className="color-light">
					<h2>Contact</h2>
					{CONFIG.CONTACT.map((row: {method:string, value:string}) => {
						//special handling for clickable methods
						let contactValue: React.JSX.Element;
						switch(row.method) {
							case "email":
								contactValue = <a className="contact-value" href={`mailto:${row.value}`}>{row.value}</a>;
								break;
							default:
								contactValue = <p className="contact-value">{row.value}</p>;
							break;
						}

						return <div className="contact-row color-light" key={row.method}>
							<p className="contact-method">{row.method}</p>
							{contactValue}
						</div>
					})}
				  </div>
			  </div>
			  
			  {/*List of Blog Posts*/}
			  <div id="posts-list">
				{BLOG_POSTS.map((post: {key:number, title:string, content:string}) => {
					return <div className="post color-light" key={post.key}>
						<h2 className="post-title">{post.title}</h2>
						<p className="post-content">{post.content}</p>
					</div>
				})}
			  </div>
			</div>
		);
	  }
}

export default App;