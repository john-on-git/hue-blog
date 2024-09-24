import ContactMethod from './ContactMethod';
import { ColorLight } from '../colorCalc';

export default function BlogInfo(props: {about:string, contactMethods: {method:string,value:string}[], hue: number}) {
    return <div id="blog-info" className="flex-horizontal">
        <div id="about-container" style={{backgroundColor:ColorLight(props.hue)}}>
            <h2 id="about-title">About</h2>
            <p id="about-body">{props.about}</p>
        </div>
        <div id="contacts-container" style={{backgroundColor:ColorLight(props.hue)}}>        
            <h2>Contact</h2>
        <div id="contact-methods-list">
            {props.contactMethods.map((row: {method:string, value:string}) => {
                return <ContactMethod key={row.method} method={row.method} value={row.value} hue={props.hue}></ContactMethod>;
            })}
        </div>
        </div>
    </div>
}