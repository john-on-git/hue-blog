import {ColorLight} from '../colorCalc';

function Post(props: {key:number, title:string, content:string, hue:number}) {
    return <div className="post" style={{backgroundColor:ColorLight(props.hue)}}>
        <h2 className="post-title">{props.title}</h2>
        <p className="post-content">{props.content}</p>
    </div>
}

export default Post;