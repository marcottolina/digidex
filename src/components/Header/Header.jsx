import React, {useState} from "react";
import style from "./Header.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton  from "../LogoutButton/LogoutButton";
import UserProfile from "../../UserProfile/UserProfile.jsx";
import { useAuth0 } from '@auth0/auth0-react';

import {
    Button,
    Collapse,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem
} from "reactstrap";


const Header = (props) => {

    //Extrapolated the props
    const { navItems } = props;

    //State for opening the collapse menu (mobile view)
    const [isOpen, setIsOpen] = useState(false);
    //Get the authentication status in Auth0
    const { isAuthenticated } = useAuth0();


    //Function for open and close the collpase menu
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    //Iter each navItems to create the link in the Header.
    //If the user is non authenticated, the link "Digidex" it's not clickable
    //and a lock appear next the item.
    const itemList = navItems.map((item) => {
        return (
            <NavItem key={item.url} className={style.navItem}>
                { !isAuthenticated && item.url === "/digidex" ?
                    <Button className={`${style.buttonClose} d-flex justify-content-center align-items-center`}>
                        {item.name}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-lock-fill ms-1" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
                        </svg>
                    </Button>
                    :
                    <NavLink to={item.url}
                             className="nav-link me-2">
                        {item.name}
                    </NavLink>
                }
            </NavItem>
        )
    });

    return (
        //Create a collapse navbar that contains the logo, the navItems,
        //the icon that represents the logged user, the button of login and logout (mutual exclusion)
        <div className={style.navBar}>
            <Navbar expand="md" dark>
            <div className={`container-fluid d-flex  align-content-center py-3 ${style.navbarContainer}`}>
                    <NavLink to="/">
                        <img src={logo} className={`${style.logo} img-fluid`} alt="logo" />
                    </NavLink>
                    <NavbarToggler onClick={toggle} className={style.toggleButton}/>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            {itemList}
                        </Nav>
                        <Nav className="d-flex flex-row mt-3 ms-auto" navbar>
                            <NavItem>
                                <UserProfile />
                            </NavItem>
                            <NavItem>
                                <LoginButton />
                            </NavItem>
                            <NavItem>
                                <LogoutButton />
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>

    );

}

export default Header;