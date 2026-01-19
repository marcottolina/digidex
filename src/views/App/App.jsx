import React from "react";
import { Routes, Route } from "react-router-dom";
import MainTemplate from "../../components/MainTemplate/MainTemplate.jsx";
import Home from "../Home/Home";
import Digidex from "../Digidex/Digidex.jsx";
import DigimonDetail from "../DigimonDetail/DigimonDetail.jsx"
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";

function App() {

    const nav = [
        { url: "/", name: "Home" },
        { url: "/digidex", name: "Digidèx" },
        { url: "/info", name: "Info" }
    ];

    return(
        <MainTemplate
            navItems={nav}
        >
            <Routes>
                <Route path="/" element={<Home />} />

                {/*Rotte protette*/}
                <Route path="/digidex" element={<ProtectedRoute component={Digidex} />} />
                <Route path="/digidex/:number" element={<ProtectedRoute component={DigimonDetail} />} />
            </Routes>
        </MainTemplate>
    )

}

export default App
