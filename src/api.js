import fetch from 'isomorphic-fetch';

const apiFetch = (url, { apiSource, ...params }) =>
  fetch(`${apiSource}/${url}`, params);

export const fetchAccomodation = params => apiFetch('accomodation', params);

export const fetchConditionsCurrent = params => apiFetch('conditions', params);

export const fetchFoodTimes = params => apiFetch('foodTimes', params);

export const fetchNews = params => apiFetch('news', params);

export const fetchText = ({ code, ...params }) => apiFetch(`texts/${code}`, params);

export const fetchTips = params => apiFetch('tips', params);

export const fetchYears = params => apiFetch('years', params);

export const fetchWorkshopDetail = ({ workshop, ...params }) =>
  apiFetch(`workshops/${workshop}`, params);

export const fetchWorkshops = params => apiFetch('workshops', params);

export const signup = ({ data, params }) => apiFetch('signup', {
  ...params,
  method: 'POST',
  body: JSON.stringify(data),
});
