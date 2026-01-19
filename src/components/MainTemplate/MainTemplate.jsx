import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function MainTemplate(props) {
    const {
        children,
        navItems
    } = props;

    return (
        <>
            <Header
                navItems = {navItems}
            />
            <div className="my-5">

                {children}

            </div>
            <Footer
                navItems = {navItems}
            />
        </>
    )
}

export default MainTemplate;