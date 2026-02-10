import React, {useEffect, useState} from "react";
import style from "./DigimonCard.module.css"
import {getDetailsById} from "../../utility/Utility.js";
import {Button, Card, CardBody, CardGroup, CardTitle, Spinner} from "reactstrap";
import {NavLink} from "react-router-dom";

const DigimonCard = (props) => {
    //Get loading status
    const[loading, setLoading] = useState(true);
    //Digimon detail data
    const[detailData, setDetailData] = useState({});
    //Extrapolated props
    const {id} = props;

    //Load data every time the id changes
    useEffect(() => {
        //Get data from API
        const fetchData = async () => {
            //Set loading to true
            setLoading(true);
            //Get Digimon details with call
            const dettagli = await getDetailsById(id);
            //Store detail data
            setDetailData(dettagli);
            //Remove loading
            setLoading(false);
        };
        //Call the function
        fetchData();
    }, [id]);

    //Handler loading
    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
                <Spinner />
            </div>
        );
    }

    return(
        //when the card is clicked the user visualize the correspondent Digimon detail in the apposite page
        <NavLink to={ id ? `/digidex/${id}` : 'digidex'}
                 onClick={(e) => {
                     //If there is not the id or the Web App is loading, block the click
                     if (!id || loading) {
                         e.preventDefault();
                     }
                 }}>
            <Card className={`${style.Card} m-2 h-100`}>
                <CardBody className="d-flex flex-column justify-content-between">
                    {/* Name Header */}
                    <CardTitle>
                        <h4 className={`${style.name} text-center`}>
                            {detailData.name ? detailData.name : "-"}
                        </h4>
                    </CardTitle>

                    {/* Image Section */}
                    <div className={`${style.containerImage}`}>
                        {detailData.images?.[0] ? (
                            <img
                                className={style.cardImage}
                                src={detailData.images[0].href}
                                alt={detailData.name}
                            />
                        ) : (
                            <p className="text-center py-5">Image not found</p>
                        )}
                    </div>

                    {/* Info Grid */}
                    <div className={`${style.cardDetail} container col-12`}>
                        <div className="row">
                            {/* Levels Section */}
                            <div className="col-4">
                                <h6>Levels</h6>
                                {detailData.levels && detailData.levels.length > 0 ? (
                                    detailData.levels.map((l) => (
                                        <React.Fragment key={l.id}>
                                            <span className="small">{l.level}</span>
                                            <br />
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <span>-</span>
                                )}
                            </div>

                            {/* Type Section */}
                            <div className="col-4">
                                <h6>Type</h6>
                                {detailData.types && detailData.types.length > 0 ? (
                                    detailData.types.map((t) => (
                                        <React.Fragment key={t.id}>
                                            <span className="small">{t.type}</span>
                                            <br />
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <span>-</span>
                                )}
                            </div>

                            {/* Attributes Section */}
                            <div className="col-4">
                                <h6>Attributes</h6>
                                {detailData.attributes && detailData.attributes.length > 0 ? (
                                    detailData.attributes.map((a) => (
                                        <React.Fragment key={a.id}>
                                            <span className="small">{a.attribute}</span>
                                            <br />
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <span>-</span>
                                )}
                            </div>

                            {/* Fields Section */}
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
                </CardBody>
            </Card>
        </NavLink>

    )

}

export default DigimonCard;