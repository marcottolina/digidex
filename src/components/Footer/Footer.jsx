import React from "react";
import style from "./Footer.module.css";
import {NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";

const Footer = (props) => {

    const {navItems} = props;

    const itemList = navItems.map((item) => {
        return (
            <NavItem key={item.url} className={style.navItem}>
                <NavLink to={item.url}
                         className="nav-link">
                    {item.name}
                </NavLink>
            </NavItem>
        )
    });

    return (
        <div className={style.footer}>
            {itemList}
        </div>
    )

}

export default Footer;