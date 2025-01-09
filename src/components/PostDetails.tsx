import React from 'react';
import {Post} from '../Interfaces.tsx';
import HueButton from './HueButton.tsx';

interface Props {
    setCurrentlyOpenPost: (post: Post|null) => void,
    post: Post,
    hue:number
};

export default class PostDetails extends React.Component<Props,any> {
    render(): React.JSX.Element
    {
        return <div>
            {/*About & Socials (about this blog and contacts, positioned before any posts)*/}
            <div className='post-details-header'>
                <HueButton
                    hue={this.props.hue}
                    onClick={() => this.props.setCurrentlyOpenPost(null)}
                >Back to Homepage</HueButton>
                <h2>{this.props.post.title}</h2>    
            </div>

            <hr></hr>

            <div className="post-details-body">            
                {this.props.post.HTMLSnippet}
            </div>
        </div>
    }
}