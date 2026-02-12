import React, { useEffect, useState } from "react";
import { getDetailsById, getMaxID } from "../../utility/Utility.js";
import style from "./DigimonDetail.module.css";
import { Navigate, NavLink, useParams } from "react-router-dom";
import {Button, Spinner} from "reactstrap";

const DigimonDetail = () => {
    //Status Detail data
    const [DetailData, setDetailData] = useState({});
    //Store the maxID that Digimon could have
    const [maxID, setMaxID] = useState(0);
    //Loading status
    const [loading, setLoading] = useState(true);

    //Take the parameter in the URL
    let { number } = useParams();

    //Check if "number" is a real number
    if (!/^\d+$/.test(number)) {
        //If it is not a number, go to 404 page
        return <Navigate to="/404" replace />;
    }

    //Assign to var "id" the parsed parameter
    let id = parseInt(number);

    //Calculate the maxID
    useEffect(() => {
        const fetchMaxID = async () => {
            //Get the maxID of the Digimon API to verify the possibility to go "next"
            const max = await getMaxID();
            //store maxID
            setMaxID(max);
        };
        //Call function
        fetchMaxID();
    }, []);

    //Take details from API
    useEffect(() => {
        //Take data from API
        const fetchData = async () => {
            //Set loading = true
            setLoading(true);
            //Get details data of Digimon
            const dettagli = await getDetailsById(id);
            //Store detail data
            setDetailData(dettagli);
            //Set loading = false
            setLoading(false);
        };

        //Call function
        fetchData();
    }, [id]);

    //Handler loading
    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
                <Spinner color="light"/>
            </div>
        );
    }

    //Handler maxID:
    //We must ensure maxID has been successfully fetched (maxID > 0)
    //before performing the validation. This prevents a race condition where
    //a valid ID (e.g., 1) is incorrectly flagged as "out of bounds" while
    //maxID is still at its initial default state of 0.
    if (maxID > 0 && (id > maxID || id < 1)) {
        return <Navigate to="/404" replace />;
    }

    //Take the english description
    const englishDesc = DetailData.descriptions?.find(d => d.language === "en_us")?.description;

    return (
        <div className="container">
            <div className="row">

                {/* Navigation */}
                <div className="container mt-3">
                    <div className="d-flex justify-content-between">
                        {/* Handler prev */}
                        {id > 1 ? (
                                <NavLink to={`/digidex/${id - 1}`}>
                                    <Button className={`${style.active}`}>
                                        &lt; Prev
                                    </Button>
                                </NavLink>
                            ) : (
                                <Button className={`${style.inactive}`}>
                                    &lt; Prev
                                </Button>
                            )
                        }
                        {/* Handler next */}
                        {id < maxID ? (
                            <NavLink to={`/digidex/${id + 1}`}>
                                <Button className={`${style.active}`}>
                                    Next &gt;
                                </Button>
                            </NavLink>
                        ) : (
                            <Button className={`${style.inactive}`}>
                                Next &gt;
                            </Button>
                        )
                        }
                    </div>
                </div>
            </div>

            <div className={`row p-3 p-md-5 mx-1 mx-md-0 mt-5 ${style.container}`}>

                {/* Name (title) */}
                <div className={`col-12 text-center ${style.name}`}>
                    <h2>{DetailData.name}</h2>
                </div>

                {/* Image */}
                <div className="col-md-5 mt-5 text-center">
                    {DetailData.images?.[0] ? (
                        <img
                            className={`${style.image} img-fluid`}
                            src={DetailData.images[0].href}
                            alt={DetailData.name}
                        />
                    ) : (
                        <p>Image not found</p>
                    )}
                </div>

                {/* Details */}
                <div className="col-md-7 mt-5">
                    <div className="row">
                        {/* Levels */}
                        <div className="col-4">
                            <h5>Levels</h5>
                            {DetailData.levels && DetailData.levels.length > 0 ? (
                                DetailData.levels.map((l) => (
                                    <React.Fragment key={l.id}>
                                        <span>{l.level}</span>
                                        <br />
                                    </React.Fragment>
                                ))
                            ) : (
                                <span>-</span>
                            )}
                        </div>

                        {/* Type */}
                        <div className="col-4">
                            <h5>Type</h5>
                            {DetailData.types && DetailData.types.length > 0 ? (
                                DetailData.types.map((t) => (
                                    <React.Fragment key={t.id}>
                                        <span>{t.type}</span>
                                        <br />
                                    </React.Fragment>
                                ))
                            ) : (
                                <span>-</span>
                            )}
                        </div>

                        {/* Attributes */}
                        <div className="col-4">
                            <h5>Attributes</h5>
                            {DetailData.attributes && DetailData.attributes.length > 0 ? (
                                DetailData.attributes.map((a) => (
                                    <React.Fragment key={a.id}>
                                        <span>{a.attribute}</span>
                                        <br />
                                    </React.Fragment>
                                ))
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                    </div>

                    {/* Fields */}
                    <div className="col-12 mt-5">
                        <h5>Fields</h5>
                        {DetailData.fields && DetailData.fields.length > 0 ? (
                            <div className="d-flex flex-wrap">
                                {DetailData.fields.map((f, index) => (
                                    <img
                                        key={index}
                                        src={f.image}
                                        alt="Field icon"
                                        className="me-3 mb-2"
                                        style={{ width: '35px' }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <span>-</span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="col-12 mt-5">
                        <h5>Description</h5>
                        {englishDesc ? (
                            <p>{englishDesc}</p>
                        ) : (
                            <p>-</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigimonDetail;