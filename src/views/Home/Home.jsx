import React from "react";
import style from "./Home.module.css";
import headerImage from "../../assets/home.jpg"

const Home = () => {

    //Display some information of this project and an image
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
                            Search through hundreds of unique creatures, filter them by attribute, and discover the secrets of their digital evolution.
                        </p>
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