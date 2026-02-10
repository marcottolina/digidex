import React, {useEffect, useState} from "react";
import style from "./Digidex.module.css";
import {getDigimonFiltered} from "../../utility/Utility.js";
import DigimonGrid from "../../components/DigimonGrid/DigimonGrid.jsx";
import DigimonList from "../../components/DigimonList/DigimonList.jsx";
import {Button, Form, Input, Spinner} from "reactstrap";


function Digidex() {

    //Set the visualization in position Grid or List
    const[GridDisplay, setGridDisplay] = useState(true);
    //Set Data to visualize
    const [Data, setData] = useState([]);
    //Set suggestions to visualize when the user search some Digimon
    const [suggestions, setSuggestions] = useState([]);
    //Get status of loading
    const[loading, setLoading] = useState(true);
    //Get status of loading when the user want more Digimon
    const[isLoadingMore, setIsLoadingMore] = useState(false);
    //Set name of the searched Digimon
    const[name, setName] = useState("");
    //Set the attribute that user want to filter
    const[attribute, setAttribute] = useState("All");
    //The page of API that the user is visualizing
    const[page, setPage] = useState(0);

    //Define all the attributed that could be filtered
    const attributes = [
        { label: "All", value: "" },
        { label: "Vaccine", value: "Vaccine" },
        { label: "Data", value: "Data" },
        { label: "Virus", value: "Virus" },
        { label: "Free", value: "Free" },
        { label: "Variable", value: "Variable" }
    ]

    //Load the first information
    useEffect(() => {
        //Take data from the API
        const fetchData = async () => {
            //Set loading = true
            setLoading(true);
            //Call
            const dati = await getDigimonFiltered("", "", page);
            //Set new Data
            setData(dati);
            //Remove loading after 200ms: the browser is faster than React.
            //Using this, I can avoid the 404 error when the user clicks fast on a Digimon
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        //Start the function
        fetchData();

    }, []);

    //Function for get the filtered data from API based on user choose
    const filteredData = async (name, attribute) => {
        //Back to 0 to avoid logic issue
        setPage(0);
        //Take Digimon from API with filter name and attribute
        //I put 0 and no "page" for avoid asynchrony
        const data = await getDigimonFiltered(name, attribute, 0);
        //Take only names to visualize them in suggestions
        const namesArray = data.map(item => item.name);
        //takes only the first 10 suggestions
        setSuggestions(namesArray.slice(0, 10));
        //Set new data
        setData(data);
    }

    //Function activated when the user want to load more Digimon on the page
    const LoadMore = async () => {
        //Set loadingMore = true
        setIsLoadingMore(true);
        //create new var that represent the next page.
        //I don't use the page status because I don't know if it exists
        const nextPage = page + 1;
        //Take data
        const data = await getDigimonFiltered(name, attribute, nextPage);
        //If there are new data, add to the existed one
        if (data.length > 0){
            setData([...Data, ...data]); //add new value
            setPage(nextPage); //Update value of page status
        }
        //Put the loading of load more = false
        setIsLoadingMore(false);
    }

    //Handler login
    if(loading){
        return (
            <div className="container w-100 position-absolute top-0 d-flex justify-content-center align-item-center">
                <Spinner />
                <h1>Loading</h1>
            </div>
        )
    }

    return (
        <>
            {/* Filter and Search Section */}
            <div className="container py-5">
                <div className="row">

                    {/* View Toggle: Switch between Grid and List */}
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

                    {/* Searchbar with autocomplete suggestions */}
                    <div className="col-md-6 order-md-2 order-1">
                        <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="search"
                                list="suggestions"
                                placeholder="Search Digimon"
                                onChange={(e) => {
                                    setName(e.target.value);
                                    // Trigger search and reset to page 0
                                    filteredData(e.target.value, attribute);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') setSuggestions([]);
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

                    {/* Attribute Filter Dropdown */}
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

            {/* Results Display: Conditional rendering based on search results and view mode */}
            {Data && Data.length > 0 ? (
                GridDisplay ? (
                    <DigimonGrid
                        dati={Data}
                        col={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
                    />
                ) : (
                    <DigimonList dati={Data} />
                )
            ) : (
                /* Empty State: Shown when no Digimon match the criteria */
                <div className={`${style.noFound} text-center mt-5 container p-5`}>
                    <p>No Digimon found matching your filters.</p>
                </div>
            )}

            {/* Pagination: Load More button displayed only if data is present */}
            {Data && Data.length > 0 && (
                <div className="container-fluid col-12 my-5 d-flex justify-content-center align-items-center">
                    <Button
                        className={`${style.loadMore}`}
                        onClick={() => LoadMore()}
                        disabled={isLoadingMore}
                    >
                        {isLoadingMore ? (
                            <>
                                <Spinner size="sm" className="me-2" />
                                Loading...
                            </>
                        ) : (
                            <span>Load more</span>
                        )}
                    </Button>
                </div>
            )}
        </>
    )

}

export default Digidex;