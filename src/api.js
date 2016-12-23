import fetch from 'isomorphic-fetch';

const API_SOURCE = 'https://private-6502a9-improtreskapi.apiary-mock.com/api';

const getApiUrl = path => `${API_SOURCE}/${path}`;

const apiFetch = url => fetch(getApiUrl(url));

export const fetchConditionsCurrent = () => apiFetch('conditions');

export const fetchNews = () => apiFetch('news');

export const fetchTips = () => apiFetch('tips');

export const fetchYears = () => apiFetch('years');

export const fetchWorkshopDetail = ({ workshop }) => apiFetch(`workshops/${workshop}`);

export const fetchWorkshops = () => apiFetch('workshops');
