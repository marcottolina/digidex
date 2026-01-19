import React, {useEffect, useState} from "react";
import style from "./DigimonCard.module.css"
import {getDetailsById} from "../../utility/Utility.js";
import {Button, Card, CardBody, CardGroup, CardTitle, Spinner} from "reactstrap";
import {NavLink} from "react-router-dom";

const DigimonCard = (props) => {
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
            <Card className="m-2 h-100">
                <CardBody className="d-flex flex-column justify-content-between">
                    {detailData.name &&
                        <CardTitle>
                            <h4
                                className="text-center">
                                {detailData.name}
                            </h4>
                        </CardTitle>
                    }
                    <div className={`${style.containerImage} mt-3`}>
                        {detailData.images?.[0] ? (
                            <img
                                className="my-3 img-fluid w-100"
                                src={detailData.images[0].href}
                                alt={detailData.name}
                            />
                        ) : (
                            <p>Image not found</p>
                        )}
                    </div>
                    <div className="container col-12 mt-3">
                        <div className="row">
                            {detailData.levels && detailData.levels.length > 0 && (
                                    <div className="col-4">
                                        <h6>Levels</h6>
                                        {detailData.levels.map((l) => (
                                            <React.Fragment key={l.id}>
                                                <span>{l.level}</span>
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </div>
                            )}
                            {detailData.types && detailData.types.length > 0 && (
                                <div className="col-4">
                                    <h6>Type</h6>
                                    {detailData.types.map((t) => (
                                        <React.Fragment key={t.id}>
                                            <span>{t.type}</span>
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                            {detailData.attributes && detailData.attributes.length > 0 && (
                                <div className="col-4">
                                    <h6>Attributes</h6>
                                    {detailData.attributes.map((a) => (
                                        <React.Fragment key={a.id}>
                                            <span>{a.attribute}</span>
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                            {/* Fields */}
                            {detailData.fields && detailData.fields.length > 0 && (
                                <div className="col-12 mt-3">
                                    <h6>Fields</h6>
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
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="container col-12 d-flex justify-content-end">
                        <NavLink to={`/digidex/${id}`}>
                            <Button className="btn align d-flex">
                                Visualize
                            </Button>
                        </NavLink>
                    </div>

                </CardBody>
            </Card>
    )

}

export default DigimonCard;