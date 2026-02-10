import React from "react";
import DigimonItem from "../DigimonItem/DigimonItem.jsx";

const DigimonList = (props) => {

    //Extrapolated props
    const {dati} = props;

    //Create all item, with an id, based on the passed data
    const allItem = dati.map((digimon) => {
        return (
            <div key={digimon.id} className="row">
                <DigimonItem data={digimon}
                    id = {digimon.id}
                />
            </div>
        )
    })

    //Render the list
    return (
        <div className="container-fluid">
            {allItem}
        </div>
    )

}

export default DigimonList;