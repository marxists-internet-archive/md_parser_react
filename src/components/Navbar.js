import React from 'react';


const Navbar = ({ onClickMD, onClickHtml, inDevAlert, addThinsp, addNbsp, addFootNote, genChapters}) =>
    <div>
        <nav>
            <div className="nav-wrapper blue-grey lighten-5">

                <div className="row">
                    <div className="col s6">

                        <ul id="nav-mobile" className="left hide-on-med-and-down" >
                            <li>
                                <a
                                    className="waves-effect waves-light btn blue-grey lighten-4 tooltipped"
                                    data-position="bottom"
                                    data-tooltip="добавить сноску"
                                    onClick={addFootNote}>
                                    FOOTNOTE</a>
                            </li>
                            <li id="separator">
                                |
                            </li>
                            <li><a
                                className="waves-effect waves-light btn grey lighten-1"
                                onClick={onClickMD} >
                                СОЗДАТЬ MD</a></li>
                            <li><a
                                className="waves-effect waves-light btn grey lighten-1"
                                onClick={onClickHtml}>
                                СОЗДАТЬ HTML</a>
                            </li>
                            <li id="separator">
                                |
                            </li>
                            <li><a
                                className="waves-effect waves-light btn grey lighten-1 tooltipped"
                                data-tooltip="сгенерировать оглавление"
                                onClick={genChapters}>
                                GEN</a>
                            </li>
                        </ul>
                    </div>
                    <div id="dropdownWidth" className="col s5">
                        <ul>
                            <li>
                                <a id="dropdownTrigger" className='dropdown-trigger btn' href='#' data-target='dropdown1'>Оглавление</a>

                                <ul id='dropdown1' className='dropdown-content'>

                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>

            </div>
        </nav>


    </div>




export default Navbar;