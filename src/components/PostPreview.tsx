import {Post} from '../Interfaces.tsx';
import HueButton from './HueButton';

export default function PostInfo(props: {setCurrentlyOpenPost: (post: Post|null) => void, post:Post, hue:number}) {
    return <HueButton
        hue={props.hue}
        onClick={() => props.setCurrentlyOpenPost(props.post)}
        >
        <h2 className="post-preview-title">{props.post.title}</h2>
        {
            props.post.image==null 
            ? 
                <div className="post-preview-body">
                    <p className="post-preview-content">{props.post.preview}</p>
                </div>
            :
                <div className="post-preview-body">
                    <p className="post-preview-content">{props.post.preview}</p>
                    <img className="post-preview-image" src={props.post.image}></img>
                </div>
        }
    </HueButton>
}