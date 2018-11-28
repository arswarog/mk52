//import activeComponent from 'react-router-active-component'
//let NavItem = activeComponent('li');
//...
//<NavItem to='/' onlyActiveOnIndex>Home</NavItem>
//<NavItem to='/generate-keywords'>Generate keywords</NavItem>

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import underline from '../scss/images/underline.png';

export interface IStickerProps {
    text: string,
    desc?: string,
    rotate: number,
    link: string,
    hueRotate: number,
}

export const Sticker = ({link, text, desc, rotate, hueRotate}: IStickerProps) => (
    <div className="sticker">
        <div style={{
            backgroundImage: 'url(https://www.picpng.com/images/large/sticky-notes-download-png-32163)',
            transform      : `rotate(${rotate}deg)`,
            filter         : `hue-rotate(${hueRotate}deg)`,
        }}>
            <NavLink to={link} activeClassName="active">
                <h5>{text}</h5>
                {desc}
                <img src={underline}/>
            </NavLink>
        </div>
    </div>
);