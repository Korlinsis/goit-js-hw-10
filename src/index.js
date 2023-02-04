import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from "lodash.debounce";
import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


inputEl.addEventListener('input', debounce(getName, DEBOUNCE_DELAY));

function getName(e) {
    fetchCountries(e.target.value);
    Notify.success(`${e.target.value} Слава Україні!`);
}

