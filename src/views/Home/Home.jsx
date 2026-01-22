import React, {useEffect} from "react";
import style from "./Home.module.css";
import headerImage from "../../assets/home.jpg"
import {Button} from "reactstrap";
import {NavLink} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const Home = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <>
            <div className={`${style.home} container p-0`}>
                <div className="row">
                    <div className="col-md-6 p-5">
                        <h1>
                            Welcome to <span className={style.digidex}>Digidèx</span>!
                        </h1>
                        <p className="mt-5">
                            Explore the vast world of Digital Monsters with our Digidex.
                            Search through hundreds of unique creatures, filter them by attribute
                            or level, and discover the secrets of their digital evolution.
                        </p>
                        {isAuthenticated ? (
                            <NavLink to="/digidex">
                                <Button className={style.button}>Go to Digidex</Button>
                            </NavLink>
                        ) : (
                            <Button
                                className={style.button}
                                onClick={() => loginWithRedirect()}
                            >
                                Login to Explore
                            </Button>
                        )}
                    </div>
                    <div className="col-md-6 d-none d-md-flex justify-content-end p-0">
                        <div>
                            <img
                                src={headerImage}
                                alt="image digimon"
                                className={`${style.imageHeader} img-fluid`}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}

export default Home;