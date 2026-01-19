import React, {useEffect} from "react";

const Home = () => {

    useEffect(() => {
        fetch("https://digi-api.com/api/v1/digimon/33")
            .then(res => res.json())
            .then(json => {
                console.log(json);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <p>Ciao</p>
    );
}

export default Home;