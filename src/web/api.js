import fetch from 'isomorphic-fetch';

const apiFetch = (url, { apiSource, ...params }) =>
  fetch(`${apiSource}/${url}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...params,
  });

export const fetchArchivedYear = ({ year, ...params }) =>
  apiFetch(`years/${year}/`, params);

export const fetchAccomodation = params => apiFetch('accomodations/', params);

export const fetchConditionsCurrent = ({ year, ...params }) =>
  apiFetch(`years/${year}/rules/latest/`, params);

export const fetchLectorRoles = params => apiFetch('lectorRoles/', params);

export const fetchLectors = params => apiFetch('lectors/', params);

export const fetchMeals = params => apiFetch('meals/', params);

export const fetchNews = params => apiFetch('news/', params);

export const fetchNewsDetail = ({ news, ...params }) =>
  apiFetch(`news/${news}/`, params);

export const fetchText = ({ code, ...params }) => apiFetch(`texts/${code}/`, params);

export const fetchTips = params => apiFetch('tips/', params);

export const fetchYears = params => apiFetch('years/', params);

export const fetchWorkshopDetail = ({ workshop, year, ...params }) =>
  apiFetch(`years/${year}/workshops/${workshop}/`, params);

export const fetchWorkshopLocations = ({ year, ...params }) =>
  apiFetch(`years/${year}/locations/`, params);

export const fetchWorkshopDifficulties = ({ ...params }) =>
  apiFetch('workshopDifficulties/', params);

export const fetchWorkshops = ({ year, ...params }) =>
  apiFetch(`years/${year}/workshops/`, params);

export const signup = ({ data, ...params }) => apiFetch('register/', {
  ...params,
  method: 'POST',
  body: JSON.stringify(data),
});

export const fetchParticipant = () => apiFetch('participant');

export const updateParticipantLastAction = () =>
  apiFetch('participant/updateLastAction/', {
    method: 'POST',
  });

export const fetchMarker = ({ address, ...params }) => fetch(
  'https://maps.googleapis.com/maps/api/geocode/' +
  `json?address=${address}&key=AIzaSyABnfkdNP9H-wCCshO_ZRYxvGoCEozHxzg`,
  params
);
