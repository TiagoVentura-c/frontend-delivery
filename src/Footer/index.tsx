import React from 'react';

import "./styles.css"
import { ReactComponent as YoutubeIcon } from "./youtube.svg"
import { ReactComponent as InstagramIcon } from "./instagram.svg"
import { ReactComponent as LinkedinIcon } from "./linkedin.svg"

function Footer(){
    return (
        <footer className='main-footer'>
            Todos os direitos reservados
            <div className='footer-icons'>
                <a href="" target='_new'><YoutubeIcon/></a>
                <a href="" target='_new'><InstagramIcon/></a>
                <a href="" target='_new'><LinkedinIcon/></a>
            </div>
        </footer>
    )
}


export default Footer;