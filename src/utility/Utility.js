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

export async function getSimilarName(name){
    if (!name || name.trim() === "") return [];
    try {
        const res = await fetch(`${baseUrl}?name=${name}`);
        const json = await res.json();

        return json.content;

        return []; // Ritorna array vuoto se non c'è contenuto
    } catch (err) {
        console.error("No names found", err);
        return [];
    }
}



