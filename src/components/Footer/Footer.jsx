import React from "react";
import style from "./Footer.module.css";
import {Button, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const Footer = (props) => {

    //Extrapolated the props
    const {navItems} = props;
    //Get the authentication status in Auth0
    const { isAuthenticated } = useAuth0();

    //Iter each navItems to create the link in the Footer.
    //If the user is non authenticated, the link "Digidex" it's not clickable
    //and a lock appear next the item.
    const itemList = navItems.map((item) => {
        return (
            <NavItem key={item.url} className={style.navItem}>
                { !isAuthenticated && item.name === "Digidèx" ?
                    <Button className={`${style.buttonClose}`}>
                        {item.name}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-lock-fill ms-1" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
                        </svg>
                    </Button>
                    :
                    <NavLink to={item.url}
                             className="nav-link">
                        {item.name}
                    </NavLink>
                }
            </NavItem>
        )
    });

    return (
        //Create the Footer with navItems and other information
        <div className={style.wrapper}>
            <div className={`${style.footer} p-5`}>
                <div className="row">
                    <div className="col-6">
                        {itemList}
                    </div>
                    <div className="col-6 d-flex justify-content-end">
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