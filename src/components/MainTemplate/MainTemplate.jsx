import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function MainTemplate(props) {
    //Extrapolate the props:
    //"children" is the content passed by App.jsx
    //and contains all the routes
    const {
        children,
        navItems
    } = props;

    return (
        //The interface it's composed by
        //a fixed header, the content and the footer.
        //We pass the navItems to Header and Footer to visualize the link
        //and give the possibility to move un the Web App.
        <div className="d-flex flex-column min-vh-100">
            <Header
                navItems = {navItems}
            />
            <div className="my-5 flex-grow-1">

                {children}

            </div>
            <Footer
                navItems = {navItems}
            />
        </div>
    )
}

export default MainTemplate;