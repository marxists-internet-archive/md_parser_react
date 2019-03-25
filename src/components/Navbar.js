import React from 'react';
import logo from '../logo.jpg';


const Navbar = ({onClickMD, onClickHtml, inDevAlert}) =>
    <nav>
        <div className="nav-wrapper blue-grey lighten-5">
            <a href="#" className="brand-logo right">
                ....
            </a>
            <ul id="nav-mobile" className="left hide-on-med-and-down" >
                <li>
                    <a onClick={inDevAlert}>
                    Текст&nbsp;
                    <span className="new badge" data-badge-caption="ОК"></span>
                    </a>
                
                </li>
                
                <li><a onClick={inDevAlert}>Метаданные&nbsp;</a></li>
                <li><a onClick={inDevAlert}>Предпросмотр&nbsp;</a></li>
                <li><a 
                className="waves-effect waves-light btn grey lighten-1" 
                onClick={onClickMD} >
                СОЗДАТЬ MD</a></li>
                <li><a
                className="waves-effect waves-light btn grey lighten-1" 
                onClick={onClickHtml}>
                СОЗДАТЬ HTML</a></li>
            </ul>
        </div>
    </nav>


export default Navbar;