import React, {useEffect, useState} from "react";
import style from "./Digidex.module.css";
import {getDigimonList, getSimilarName} from "../../utility/Utility.js";
import DigimonGrid from "../../components/DigimonGrid/DigimonGrid.jsx";
import DigimonList from "../../components/DigimonList/DigimonList.jsx";
import {Button, Form, Input} from "reactstrap";


function Digidex() {

    const[GridDisplay, setGridDisplay] = useState(true);
    const [Data, setData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const[loading, setLoading] = useState(true);

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

    const loadSuggestions = async (name) => {
        if (name.length < 2) {
            setSuggestions([]);
            return;
        }
        const data = await getSimilarName(name);
        const namesArray = data.map(item => item.name);
        setSuggestions(namesArray);
        setData(data);
    };

    return(
        <>
            <div className="container-fluid my-5">
                <div className="row">

                    <div className="col-3">
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

                    <div className="col-6">
                        <Form className="d-flex">
                            <Input
                                type="search"
                                list="suggestions"
                                placeholder="Search Digimon"
                                onChange={(e) => loadSuggestions(e.target.value)}
                            />
                            <datalist id="suggestions">
                                {suggestions.map((s) => (
                                    <option key={s} value={s} />
                                ))}
                            </datalist>
                            <Button
                                className="ms-2"
                                onClick={() => setSuggestions([])}
                            >
                                Search
                            </Button>
                        </Form>

                    </div>

                </div>
            </div>
            { GridDisplay ?
                <DigimonGrid
                    dati = {Data}
                    col={{xs:1, sm:2, md:2, lg:3, xl:4}}
                />
                :
                <DigimonList
                    dati = {Data}
                />
            }
        </>
    )

}

export default Digidex;