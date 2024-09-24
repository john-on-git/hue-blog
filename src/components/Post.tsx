import {ColorLight} from '../colorCalc';

function Post(props: {id:number, title:string, content:string, imageLoc: string, hue:number}) {
    return <div className="post" style={{backgroundColor:ColorLight(props.hue)}}>
        <h2 className="post-title">{props.title}</h2>
        {
            props.imageLoc==null 
            ? 
                <div className="post-body">
                    <p className="post-content">{props.content}</p>
                </div>
            :
                <div className="post-body">
                    <p className="post-content">{props.content}</p>
                    <img className="post-image" src={props.imageLoc}></img>
                </div>
        }
    </div>
}

export default Post;