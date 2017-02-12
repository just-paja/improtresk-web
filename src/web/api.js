import fetch from 'isomorphic-fetch';

const apiFetch = (url, { apiSource, ...params }) =>
  fetch(`${apiSource}/${url}`, params);

export const fetchArchivedYear = ({ year, ...params }) =>
  apiFetch(`years/${year}`, params);

export const fetchAccomodation = params => apiFetch('accomodations', params);

export const fetchConditionsCurrent = params => apiFetch('conditions', params);

export const fetchLectorRoles = params => apiFetch('lectorRoles/', params);

export const fetchLectors = params => apiFetch('lectors/', params);

export const fetchMeals = params => apiFetch('meals', params);

export const fetchNews = params => apiFetch('news', params);

export const fetchNewsDetail = ({ news, ...params }) =>
  apiFetch(`news/${news}`, params);

export const fetchText = ({ code, ...params }) => apiFetch(`texts/${code}`, params);

export const fetchTips = params => apiFetch('tips', params);

export const fetchYears = params => apiFetch('years', params);

export const fetchWorkshopDetail = ({ workshop, year, ...params }) =>
  apiFetch(`years/${year}/workshops/${workshop}`, params);

export const fetchWorkshopDifficulties = ({ ...params }) =>
  apiFetch('workshopDifficulties/', params);

export const fetchWorkshops = ({ year, ...params }) =>
  apiFetch(`years/${year}/workshops/`, params);

export const signup = ({ data, ...params }) => apiFetch('signup', {
  ...params,
  method: 'POST',
  body: JSON.stringify(data),
});
