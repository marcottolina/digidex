import React from "react";
import style from "./Footer.module.css";
import {NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";

const Footer = (props) => {

    const {navItems} = props;

    const itemList = navItems.map((item) => {
        return (
            <NavItem key={item.url} className={`${style.navItem}`}>
                <NavLink to={item.url}
                         className="nav-link">
                    {item.name}
                </NavLink>
            </NavItem>
        )
    });

    return (
        <div className={style.wrapper}>
            <div className={`${style.footer} p-5`}>
                <div className="row">
                    <div className="col-6">
                        {itemList}
                    </div>
                    <div className="col-6">
                        <p className="small">
                            Created by <b>Marco Ottolina</b> for Web Application Exam course in UniMiB.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Footer;