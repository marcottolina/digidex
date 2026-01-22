import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import MainTemplate from "../../components/MainTemplate/MainTemplate.jsx";
import Home from "../Home/Home";
import Digidex from "../Digidex/Digidex.jsx";
import Page404 from "../Page404/Page404.jsx";
import DigimonDetail from "../DigimonDetail/DigimonDetail.jsx"
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";

function App() {

    const nav = [
        { url: "/", name: "Home" },
        { url: "/digidex", name: "Digidèx" },
    ];

    useEffect(() => {
        document.title = "Digidex";
    })

    return(
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
