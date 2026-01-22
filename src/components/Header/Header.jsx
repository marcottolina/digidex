import React, {useState} from "react";
import style from "./Header.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton  from "../LogoutButton/LogoutButton";
import UserProfile from "../../UserProfile/UserProfile.jsx";

import {
    Collapse,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem
} from "reactstrap";


const Header = (props) => {

    const { navItems } = props;

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

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
        <div className={style.navBar}>
            <Navbar expand="md" dark>
                <div className={`container d-flex  align-content-center py-3 ${style.navbarContainer}`}>
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