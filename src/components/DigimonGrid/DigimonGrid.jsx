import React from "react";
import DigimonCard from "../DigimonCard/DigimonCard.jsx"

const DigimonGrid = (props) => {
    //Extrapolated props
    const {dati, col} = props;
    //Create all card, with an id, based on the passed data
    const allCards = dati.map((digimon) => {
        return (
            <div key={digimon.id} className="col">
                <DigimonCard
                    id = {digimon.id}
                />
            </div>
        )
    })

    //Render the responsive grid layout using Bootstrap row-cols classes
    return (
        <div className={`p-3 row 
                row-cols-${col.xs}
                row-cols-sm-${col.sm}
                row-cols-md-${col.md}
                row-cols-lg-${col.lg}
                row-cols-xl-${col.xl}
                g-3
        `}>
                {allCards}
        </div>
    )
}

export default DigimonGrid;