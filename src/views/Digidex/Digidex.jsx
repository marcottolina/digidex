import React, {useEffect, useState} from "react";
import style from "./Digidex.module.css";
import {getDigimonList, getDigimonFiltered} from "../../utility/Utility.js";
import DigimonGrid from "../../components/DigimonGrid/DigimonGrid.jsx";
import DigimonList from "../../components/DigimonList/DigimonList.jsx";
import {Button, Form, Input} from "reactstrap";


function Digidex() {

    const[GridDisplay, setGridDisplay] = useState(false);
    const [Data, setData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const[loading, setLoading] = useState(true);
    const[name, setName] = useState("");
    const[attribute, setAttribute] = useState("All");

    const attributes = [
        { label: "All", value: "" },
        { label: "Vaccine", value: "Vaccine" },
        { label: "Data", value: "Data" },
        { label: "Virus", value: "Virus" },
        { label: "Free", value: "Free" },
        { label: "Variable", value: "Variable" }
    ]

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            setLoading(true);
            const dati = await getDigimonList(50);

            if (mounted) {
                setData(dati);
                setLoading(false);
            }
        }

        fetchData();

        return () => {
            mounted = false;
        };

    }, []);

    const filteredData = async (name, attribute) => {
        const data = await getDigimonFiltered(name, attribute);
        const namesArray = data.map(item => item.name);
        //takes only the first 10
        setSuggestions(namesArray.slice(0, 10));
        setData(data);
    }

    return(
        <>
            <div className="container py-5">
                <div className="row">

                    <div className="col-6 col-md-3 order-md-1 order-2 mt-4 mt-md-0">
                        <Button
                            className={`${style.btnView} ${GridDisplay ? style.active : style.inactive} me-2`}
                            onClick={() => setGridDisplay(true)}
                        >
                            Grid
                        </Button>
                        <Button
                            className={`${style.btnView} ${GridDisplay ? style.inactive : style.active}`}
                            onClick={() => setGridDisplay(false)}
                        >
                            List
                        </Button>
                    </div>

                    <div className="col-md-6 order-md-2 order-1">
                        <Form className="d-flex">
                            <Input
                                type="search"
                                list="suggestions"
                                placeholder="Search Digimon"
                                onChange={(e) => {
                                    setName(e.target.value);
                                    filteredData(e.target.value, attribute);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') setSuggestions([]); // Close suggestion when Enter is clicked
                                }}
                            />
                            <datalist id="suggestions">
                                {suggestions.map((s) => (
                                    <option key={s} value={s} />
                                ))}
                            </datalist>
                            <Button
                                type="button"
                                className={`${style.search} ms-2`}
                                onClick={() => setSuggestions([])}
                            >
                                Search
                            </Button>
                        </Form>

                    </div>

                    <div className="col-md-3 col-6 order-md-3 order-3 mt-4 mt-md-0">
                        <div className="d-flex justify-content-center align-items-center">
                            <span className={`${style.label} me-2`}>Attributes</span>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                onChange={(e) => {
                                    setAttribute(e.target.value);
                                    filteredData(name, e.target.value);
                                }}
                            >
                                {attributes.map(attribute => (
                                    <option key={attribute.value} value={attribute.value}>
                                        {attribute.label}
                                    </option>
                                ))}
                            </Input>
                        </div>
                    </div>

                </div>
            </div>

            {Data && Data.length > 0 ? (

                GridDisplay ? (
                    <DigimonGrid
                        dati={Data}
                        col={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
                    />
                ) : (
                    <DigimonList
                        dati={Data}
                    />
                )
            ) : (

                <div className={`${style.noFound} text-center mt-5 container p-5`}>
                    <p>No Digimon found matching your filters.</p>
                </div>
            )}

        </>
    )

}

export default Digidex;