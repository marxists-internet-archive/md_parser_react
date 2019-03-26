import React from 'react';


const Navbar = ({ onClickMD, onClickHtml, inDevAlert, addNobr, addNbsp, addFootNote }) =>
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
                <li>
                        <a
                            className="waves-effect waves-light btn blue-grey lighten-4 tooltipped"
                            data-position="bottom" 
                            data-tooltip="неразрывный пробел"
                            onClick={addNbsp}>
                            NBSP
                        </a>
                </li>
                <li>
                    <a
                        className="waves-effect waves-light btn blue-grey lighten-4 tooltipped"
                        data-position="bottom" 
                        data-tooltip="запретить перенос<br> (выделите текст)"
                        onClick={addNobr}>
                        NOBR</a>
                </li>
                <li>
                    <a
                        className="waves-effect waves-light btn blue-grey lighten-4 tooltipped"
                        data-position="bottom" 
                        data-tooltip="сноска"
                        onClick={addFootNote}>
                        FOOTNOTE</a>
                </li>
                <li>
                    <a>|</a>
                </li>
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