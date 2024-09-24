import React from 'react';

export default function ContactMethod(props: {method:string, value:string, hue:number}) {
    let contactValue: React.JSX.Element;
    switch(props.method) {
        case "email":
            contactValue = <a className="contact-value" href={`mailto:${props.value}`}>{props.value}</a>;
            break;
        default:
            contactValue = <p className="contact-value">{props.value}</p>;
        break;
    }

    return <div className="contact-row" key={props.method}>
        <p className="contact-method">{props.method}</p>
        {contactValue}
    </div>
}