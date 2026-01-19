import React, {useState} from "react";
import DigimonCard from "../DigimonCard/DigimonCard.jsx";
import DigimonItem from "../DigimonItem/DigimonItem.jsx";

const DigimonList = (props) => {

    const {dati} = props;

    const allItem = dati.map((digimon) => {
        return (
            <div key={digimon.id} className="col">
                <DigimonItem data={digimon}
                    id = {digimon.id}
                />
            </div>
        )
    })

    return (

        <div className="container-fluid">
            {allItem}
        </div>

    )

}

export default DigimonList;