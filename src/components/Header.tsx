import headerImage from '../headers/perlin.png';

export default function Header(props: {text: string, hue:number}) {
    return <header>
        <img
            id="header-image"
            src={headerImage}
            style={{filter:`sepia() hue-rotate(${props.hue-45}deg) saturate(400%)`}} //-50 degrees offset seems to be the most accurate empirically (it should be 60).
        ></img>
        <h1 id="header-text">{props.text}</h1>
    </header>
}