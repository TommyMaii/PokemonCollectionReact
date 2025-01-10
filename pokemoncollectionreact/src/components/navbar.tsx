import React from 'react';
import '../css/navBar.css'
import {Link} from "react-router-dom";

const logo = require('../assets/gengar3.jpg');

const Navbar = () => {
    return <>
        <nav className="navbar">
            <div className="navbar-left">
                    <img src={String(logo)} className="LogoIcon"/>
                <a href="/" className="logo">
                    <p style={{display: "inline", color: "black"}}>  Pokemon</p>
                    <p style={{display: "inline", color: "#1B263B"}}>Collection</p>
                </a>
            </div>
            <div className="navbar-center">

            </div>
            <div className="navbar-right">
                <ul className="nav-links">
                    <li>
                        <Link to={'/cards'}>Cards</Link>
                    </li>
                    <li>
                        <a href="/about">Sets</a>
                    </li>
                    <li>
                        <Link to={'/collection'}>Collection</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </>;
};

export default Navbar;