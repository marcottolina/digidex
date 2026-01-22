import React, {useEffect, useState} from "react";
import {getDetailsById} from "../../utility/Utility.js";
import {Button, CardTitle, Spinner} from "reactstrap";
import style from "./DigimonItem.module.css";
import {NavLink} from "react-router-dom";

const DigimonItem = (props) => {

    const[loading, setLoading] = useState(true);
    const[detailData, setDetailData] = useState({});
    const {id} = props;

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            setLoading(true);
            const dettagli = await getDetailsById(id);

            if (mounted) {
                setDetailData(dettagli);
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
                <Spinner />
            </div>
        );
    }

    return(

        <NavLink to={`/digidex/${id}`}>
            <div className={`${style.Item} container p-3 my-3`}>
                <div className="row">
                    {/* Name Column - kept for structure */}
                    <div className="col-6">
                        <div className="row">
                            <h4 className={`${style.name} text-center col-lg-5`}>
                                {detailData.name ? detailData.name : "-"}
                            </h4>

                            {/* Image Column */}
                            <div className={`${style.containerImage} col-lg-7`}>
                                {detailData.images?.[0] ? (
                                    <img
                                        className={style.image}
                                        src={detailData.images[0].href}
                                        alt={detailData.name}
                                    />
                                ) : (
                                    <p className="text-center">Image not found</p>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* Data Column */}
                    <div className="col-6">
                        <div className="row">
                            {/* Levels Column */}
                            <div className="col-6 col-md-4">
                                <h6>Levels</h6>
                                {detailData.levels && detailData.levels.length > 0 ? (
                                    detailData.levels.map((l) => (
                                        <React.Fragment key={l.id}>
                                            <span>{l.level}</span>
                                            <br />
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <span>-</span>
                                )}
                            </div>

                            {/* Type Column - Fixed Structure */}
                            <div className="col-6 col-md-4">
                                <h6>Type</h6>
                                {detailData.types && detailData.types.length > 0 ? (
                                    detailData.types.map((t) => (
                                        <React.Fragment key={t.id}>
                                            <span>{t.type}</span>
                                            <br />
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <span>-</span>
                                )}
                            </div>

                            {/* Attributes Column - Fixed Structure */}
                            <div className="col-6 mt-3 mt-md-0 col-md-4">
                                <h6>Attributes</h6>
                                {detailData.attributes && detailData.attributes.length > 0 ? (
                                    detailData.attributes.map((a) => (
                                        <React.Fragment key={a.id}>
                                            <span>{a.attribute}</span>
                                            <br />
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <span>-</span>
                                )}
                            </div>

                            {/* Fields - Full width row */}
                            <div className="col-12 mt-3">
                                <h6>Fields</h6>
                                {detailData.fields && detailData.fields.length > 0 ? (
                                    <div className="d-flex flex-wrap">
                                        {detailData.fields.map((f, index) => (
                                            <img
                                                key={index}
                                                src={f.image}
                                                alt="Field icon"
                                                className="me-3 mb-2"
                                                style={{ width: '30px' }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <span>-</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>

    )

}

export default DigimonItem;