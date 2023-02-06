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

    if (e.target.value.trim() === '') return;

    fetchCountries(e.target.value)
    .then(data => {
        if (data.length === 1) {
            countryInfo.innerHTML = showCountry(data[0]);
        } else if (data.length > 10) {
            return Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
            list.innerHTML =  showCountriesList(data);
        }
    })
    .catch(Notify.failure('Oops, there is no country with that name'));
}

function showCountry({name, flags, capital, population, languages}) {
    return `
    <div class="name">
        <img src="${flags.svg}" alt="${name.official}" width="30" height="20">
        <h2>${name.official}</h2>
    </div>
    <ul>
        <li>Capital: <span>${capital}</span></li>
        <li>Population: <span>${population}</span></li>
        <li>Languages: <span>${Object.values(languages)}</span></li>
    </ul>
    `;
}

function showCountriesList(countries) {
    return countries.reduce((list, {flags, name}) => {
        return `
        <li class="name">
            <img src="${flags.svg}" alt="${name.official}" width="30" height="20">
            <p>${name.official}</p>
        </li>`
        + list;
      }, '');
}

