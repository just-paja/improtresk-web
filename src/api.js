import fetch from 'isomorphic-fetch';

const API_SOURCE = 'https://private-6502a9-improtreskapi.apiary-mock.com/api';

const getApiUrl = path => `${API_SOURCE}/${path}`;

const apiFetch = (url, params) => fetch(getApiUrl(url), params);

export const fetchAccomodation = () => apiFetch('accomodation');

export const fetchConditionsCurrent = () => apiFetch('conditions');

export const fetchFoodTimes = () => apiFetch('foodTimes');

export const fetchNews = () => apiFetch('news');

export const fetchText = ({ code }) => apiFetch(`texts/${code}`);

export const fetchTips = () => apiFetch('tips');

export const fetchYears = () => apiFetch('years');

export const fetchWorkshopDetail = ({ workshop }) => apiFetch(`workshops/${workshop}`);

export const fetchWorkshops = () => apiFetch('workshops');

export const signup = ({ data }) => apiFetch('signup', {
  method: 'POST',
  body: JSON.stringify(data),
});
