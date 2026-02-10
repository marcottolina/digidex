//BaseUrl, that is present in each call
const baseUrl = 'https://digi-api.com/api/v1/digimon';

/**
 * Retrieves the full details of a specific Digimon given its unique ID.
 * The API call returns a JSON object containing:
 * - name: The Digimon's name (string)
 * - images: An array of image objects with href links
 * - levels: An array of evolutionary levels
 * - types: An array of Digimon types
 * - attributes: An array of attributes (Vaccine, Virus, etc.)
 * - fields: An array of icons and names for digital fields
 * - descriptions: An array of descriptions in various languages
 * Return the detail object or null if the request fails
 */

export async function getDetailsById(id) {
    try {
        const res = await fetch(`${baseUrl}/${id}`);
        return await res.json(); // Per il dettaglio, l'API restituisce direttamente l'oggetto
    } catch (err) {
        console.error("Error in Detail:", err);
        return null;
    }
}

/**
 * Fetches the total count of Digimon available in the database.
 * This value is used to set the upper boundary for navigation
 * and prevent "Next" button clicks beyond the last existing ID.
 * Returns the total number of Digimon elements.
 */
export async function getMaxID() {
    const res = await fetch(baseUrl);
    const json = await res.json();
    console.log("Total Digimon in page:", json.pageable.totalElements);
    return json.pageable.totalElements;
}


/**
 * Fetches a paginated list of Digimon filtered by name and attribute.
 * This function builds a dynamic query string based on provided filters:
 * - name: Filters by Digimon name (partial matches).
 * - attribute: Filters by type (Vaccine, Virus, etc.).
 * - page: Manages pagination (defaults to 0).
 * @param name - The search string for the Digimon name.
 * @param {string} attribute - The attribute category to filter by.
 * @param {number} page - The current page index for the API request.
 * @returns {Promise<Array>} A promise that resolves to an array of Digimon objects.
 */
export async function getDigimonFiltered(name, attribute, page = 0) {
    try {
        // Initializing search parameters with pageSize = 20
        const params = new URLSearchParams();
        params.append("pageSize", "20");
        params.append("page", page);

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


