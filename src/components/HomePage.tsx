import React from 'react';
import {Post} from '../Interfaces.tsx';
import BlogInfo from './BlogInfo'
import PostPreview from './PostPreview'
import InfiniteScroll from 'react-infinite-scroll-component';


interface Props {
    setCurrentlyOpenPost: (post: Post|null) => void,
    hue:number,
    about:string,
    contactMethods:{
        method: string,
        value:string
    }[], 
    allPosts:Post[],
    postsPerPage:number
};

export default class HomePage extends React.Component<Props,any> {
    state = {
        visiblePosts: []
    }
    fetchPosts(n:number)
    {
        //TODO fetching posts from a microservice might be good as practice. random generation with LLM?
        this.setState({
            visiblePosts: [...this.state.visiblePosts, ...this.props.allPosts.slice(this.state.visiblePosts.length, this.state.visiblePosts.length + n)]
        });
    }
    componentDidMount(): void {
		this.fetchPosts(this.props.postsPerPage);
	}
    render(): React.JSX.Element
    {
        return <div>
            {/*About & Socials (about this blog and contacts, positioned before any posts)*/}
            <BlogInfo about={this.props.about} contactMethods={this.props.contactMethods} hue={this.props.hue}></BlogInfo>
            
            <hr></hr>

            <InfiniteScroll
            dataLength={this.state.visiblePosts.length}
            next={()=>{this.fetchPosts(this.props.postsPerPage)}}
            hasMore={this.state.visiblePosts.length!=this.props.allPosts.length}

            loader={<p className="posts-loading">Loading...</p>}
            endMessage={<p className="posts-end">End of posts.</p>}
            >
            <div id="posts-list">
                {this.state.visiblePosts.map((post: Post) => {
                    return <PostPreview key={post.id} setCurrentlyOpenPost={this.props.setCurrentlyOpenPost} post={post} hue={this.props.hue}></PostPreview>
                })}
            </div>
            </InfiniteScroll>
        </div>
    }
}