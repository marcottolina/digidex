import React, { useEffect, useState } from "react";
import { getDetailsById, getMaxID } from "../../utility/Utility.js";
import style from "./DigimonDetail.module.css";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";

const DigimonDetail = () => {
    const [DetailData, setDetailData] = useState({});
    const [maxID, setMaxID] = useState(0);
    const [loading, setLoading] = useState(true);

    let { number } = useParams();

    if (!/^\d+$/.test(number)) {
        return <Navigate to="/404" replace />;
    }

    let id = parseInt(number);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            setLoading(true);
            const dettagli = await getDetailsById(id);
            const totale = await getMaxID();

            if (mounted) {
                setDetailData(dettagli);
                setMaxID(totale);
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
                <Spinner />
            </div>
        );
    }

    // Cerco la descrizione inglese (più sicuro dell'indice fisso)
    const englishDesc = DetailData.descriptions?.find(d => d.language === "en_us")?.description;

    return (
        <div className="container">
            <div className="row">

                {/* Navigazione */}
                <div className="col-12 mt-3">
                    <div className="d-flex flex-row justify-content-between">
                        {id > 1 && (
                            <NavLink to={`/digidex/${id - 1}`}>&lt; Prev</NavLink>
                        )}
                        {id < maxID && (
                            <NavLink to={`/digidex/${id + 1}`}>Next &gt;</NavLink>
                        )}
                    </div>
                </div>

                {/* Titolo */}
                <div className="col-12 text-center mt-5">
                    <h2>{DetailData.name}</h2>
                </div>

                {/* Immagine */}
                <div className="col-md-6 mt-5 text-center">
                    {DetailData.images?.[0] ? (
                        <img
                            className="img-fluid"
                            src={DetailData.images[0].href}
                            alt={DetailData.name}
                        />
                    ) : (
                        <p>Image not found</p>
                    )}
                </div>

                {/* Dettagli Tecnici */}
                <div className="col-md-6 mt-5">
                    <div className="row">
                        {DetailData.levels && DetailData.levels.length > 0 && (
                            <div className="col-4">
                                <h5>Levels</h5>
                                {DetailData.levels.map((l) => (
                                    <React.Fragment key={l.id}>
                                        <span>{l.level}</span>
                                        <br />
                                    </React.Fragment>
                                ))}
                            </div>
                        )}

                        {DetailData.types && DetailData.types.length > 0 && (
                            <div className="col-4">
                                <h5>Type</h5>
                                {DetailData.types.map((t) => (
                                    <React.Fragment key={t.id}>
                                        <span>{t.type}</span>
                                        <br />
                                    </React.Fragment>
                                ))}
                            </div>
                        )}

                        {DetailData.attributes && DetailData.attributes.length > 0 && (
                            <div className="col-4">
                                <h5>Attributes</h5>
                                {DetailData.attributes.map((a) => (
                                    <React.Fragment key={a.id}>
                                        <span>{a.attribute}</span>
                                        <br />
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Fields */}
                    {DetailData.fields && DetailData.fields.length > 0 && (
                        <div className="col-12 mt-5">
                            <h5>Fields</h5>
                            <div className="d-flex flex-wrap">
                                {DetailData.fields.map((f, index) => (
                                    <img
                                        key={index}
                                        src={f.image}
                                        alt="Field icon"
                                        className="me-3 mb-2"
                                        style={{ width: '50px' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Descrizione */}
                    {englishDesc && (
                        <div className="col-12 mt-5">
                            <h5>Description</h5>
                            <p style={{ whiteSpace: 'pre-line' }}>{englishDesc}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DigimonDetail;