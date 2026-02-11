import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import MainTemplate from "../../components/MainTemplate/MainTemplate.jsx";
import Home from "../Home/Home";
import Digidex from "../Digidex/Digidex.jsx";
import Page404 from "../Page404/Page404.jsx";
import DigimonDetail from "../DigimonDetail/DigimonDetail.jsx"
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
import {useAuth0} from "@auth0/auth0-react";

function App() {

    const { isLoading, error } = useAuth0();

    // Define navigation items: 'url' is the path and 'name' is the label displayed in the navbar
    const nav = [
        { url: "/", name: "Home" },
        { url: "/digidex", name: "Digidèx" },
    ];

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    //Set the document title in "Digidex" when the component is mounted
    useEffect(() => {
        document.title = "Digidex";
    }, [])

    if (isLoading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="spinner-border text-warning" role="status"></div>
            </div>
        );
    }

    return(
        //MainTemplate handles the layout with navItems.
        // Routes include Home (public access) and protected routes for Digidex and
        // DigimonDetail (authentication required).
        <MainTemplate
            navItems={nav}
        >
            <Routes>
                <Route path="/" element={<Home />} />

                {/*Protected routes*/}
                <Route path="/digidex" element={<ProtectedRoute component={Digidex} />} />
                <Route path="/digidex/:number" element={<ProtectedRoute component={DigimonDetail} />} />

                <Route path="*" element={<Page404 />} />
            </Routes>
        </MainTemplate>
    )

}

export default App
