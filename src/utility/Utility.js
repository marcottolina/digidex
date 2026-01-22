const baseUrl = 'https://digi-api.com/api/v1/digimon';

// Esportiamo le funzioni così puoi importarle nei componenti
export async function getDetailsById(id) {
    try {
        const res = await fetch(`${baseUrl}/${id}`);
        return await res.json(); // Per il dettaglio, l'API restituisce direttamente l'oggetto
    } catch (err) {
        console.error("Error in Detail:", err);
        return null;
    }
}

export async function getDigimonList(num) {
    try {
        const res = await fetch(`${baseUrl}?pageSize=${num}`);
        const json = await res.json();
        // L'API di Digimon mette l'elenco dentro la chiave "content"
        return json.content;
    } catch (err) {
        console.error("Error in List:", err);
        return [];
    }
}

export async function getMaxID() {
    const res = await fetch(baseUrl);
    const json = await res.json();

    console.log("Total Digimon in page:", json.pageable.totalElements);

    return json.pageable.totalElements;
}

export async function getDigimonFiltered(name, attribute) {
    try {
        // Initializing search parameters with pageSize = 100
        const params = new URLSearchParams();
        params.append("pageSize", "100");

        // Add name to query if it's provided and not empty
        if (name && name.trim() !== "") {
            params.append("name", name);
        }

        // Add attribute to query if it's not "All" or empty
        if (attribute && attribute !== "All" && attribute !== "") {
            params.append("attribute", attribute);
        }

        // Fetching data with the combined parameters (name, attribute, pageSize)
        const res = await fetch(`${baseUrl}?${params.toString()}`);
        const json = await res.json();

        // Return the digimon list or an empty array to avoid .map() errors
        return json.content || [];

    } catch (err) {
        // Log error and return empty array if fetch fails
        console.error("Error during filtered search:", err);
        return [];
    }
}


