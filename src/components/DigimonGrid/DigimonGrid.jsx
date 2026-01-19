import React, {useEffect} from "react";
import DigimonCard from "../DigimonCard/DigimonCard.jsx"

const DigimonGrid = (props) => {

    const {dati, col} = props;

    const allCards = dati.map((digimon) => {
        return (
            <div key={digimon.id} className="col">
                <DigimonCard
                    id = {digimon.id}
                />
            </div>
        )
    })

    return (
        <div className={`row 
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