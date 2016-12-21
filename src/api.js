import fetch from 'isomorphic-fetch';

const API_SOURCE = 'https://private-6502a9-improtreskapi.apiary-mock.com/api';

export const getApiUrl = path => `${API_SOURCE}/${path}`;

export const apiFetch = url => fetch(getApiUrl(url));

export const fetchYears = () => apiFetch('years');
