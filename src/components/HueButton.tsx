import { ReactNode } from 'react';
import { ColorLight, ColorMedium } from '../colorCalc';
import React from 'react';

interface Props {
        hue:number,
        onClick: () => void,
        children: ReactNode|ReactNode[]
}

export default class HueButton extends React.Component<Props,any> {
    state = {
        colorProvider: ColorMedium
    }
    render(): ReactNode {
    return <div
        style={{backgroundColor:this.state.colorProvider(this.props.hue)}}
        onClick={ this.props.onClick }
        className={"hue-button"}
        onMouseEnter={() => this.setState({colorProvider: ColorLight})}
        onMouseLeave={() => this.setState({colorProvider: ColorMedium})}
    >
    {this.props.children}
    </div>
    }
}