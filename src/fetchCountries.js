const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
    return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (response.status === 404)  throw new Error ("404");
            return response.json();
        }
    );
}