import './css/styles.css';
import debounce from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


inputEl.addEventListener('input', debounce(getCountries, DEBOUNCE_DELAY));

function getCountries(e) {
    const request = e.target.value.trim();
    list.innerHTML =  '';
    countryInfo.innerHTML = '';

    if (request === '') return;

    fetchCountries(request)
    .then(data => {
        if (data.length === 1) {
            countryInfo.innerHTML = showCountry(data[0]);
        } else if (data.length > 10) {
            return Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
            list.innerHTML =  showCountriesList(data);
        }
    })
    .catch(onError);
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
        <li>Languages: <span>${Object.values(languages).join(', ')}</span></li>
    </ul>`;
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

function onError() {
    return Notify.failure('Oops, there is no country with that name');
}

