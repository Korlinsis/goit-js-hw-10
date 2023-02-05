import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from "lodash.debounce";
import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


inputEl.addEventListener('input', debounce(getCountries, DEBOUNCE_DELAY));

function getCountries(e) {
    list.innerHTML =  '';
    countryInfo.innerHTML = '';
    fetchCountries(e.target.value.trim())
    .then(data => {
        if (data.length === 1) {
            countryInfo.innerHTML = showCountry(data[0]);
            console.log(data);
        } else if (data.length > 10) {
            return Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
            list.innerHTML =  showCountriesList(data);
            console.log(data);
        }
    })
    .catch(Notify.failure('Oops, there is no country with that name'));
}

function showCountry({name, flags, capital, population, languages}) {
    return `
    <div>
        <img src="${flags.svg}" alt="${name.official}" width="30">
        <p>${name.official}</p>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages)}</p>
    </div>
    `;
}

function showCountriesList(countries) {
    return countries.reduce((list, {flags, name}) => {
        return `
        <li>
            <img src="${flags.svg}" alt="${name.official}" width="30">
            <p>${name.official}</p>
        </li>`
        + list;
      }, '');
}

