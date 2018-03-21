import qsm from 'query-string-manipulator';
import fetch from 'isomorphic-fetch';

import { idFromSlug } from './routeTable';

const apiFetch = (url, { apiSource, headers = {}, ...params }) =>
  fetch(`${apiSource}/${url}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    },
    ...params,
  });

const apiFetchAuthorized = (url, { auth, ...params }) =>
  apiFetch(url, {
    headers: {
      Authorization: `Bearer ${auth.access_token}`,
    },
    ...params,
  });

export const fetchArchivedYear = ({ year, ...params }) =>
  apiFetch(`years/${idFromSlug(year)}/`, params);

export const fetchAccomodation = ({ year, ...params }) =>
  apiFetch(`years/${year}/accomodation/`, params);

export const fetchCapacity = ({ year, ...params }) =>
  apiFetch(`years/${year}/capacity/`, params);

export const fetchRules = ({ year, ...params }) =>
  apiFetch(`years/${year}/rules/latest/`, params);

export const fetchLectorRoles = params => apiFetch('lectorRoles/', params);

export const fetchLectors = params => apiFetch('lectors/', params);

export const fetchMeals = ({ year, ...params }) =>
  apiFetch(`years/${year}/meals/`, params);

export const fetchNews = params => apiFetch('news/', params);

export const fetchNewsDetail = ({ newsId, ...params }) =>
  apiFetch(`news/${idFromSlug(newsId)}/`, params);

export const fetchPerformers = ({ year, ...params }) =>
  apiFetch(`years/${year}/performers/`, params);

export const fetchPerformerDetail = ({ performer, year, ...params }) =>
  apiFetch(`years/${year}/performers/${idFromSlug(performer)}/`, params);

export const fetchTeams = params => apiFetch('teams/', params);

export const fetchText = ({ lang, category, ...params }) =>
  apiFetch(qsm('texts/', {
    set: { lang, category },
  }), params);

export const fetchTips = params => apiFetch('traveling-tips/', params);

export const fetchYears = params => apiFetch('years/', params);

export const fetchScheduleEvents = ({ year, ...params }) =>
  apiFetch(`years/${year}/schedule/`, params);

export const fetchWorkshopDetail = ({ workshop, year, ...params }) =>
  apiFetch(`years/${year}/workshops/${idFromSlug(workshop)}/`, params);

export const fetchLocations = ({ year, ...params }) =>
  apiFetch(`years/${year}/locations/`, params);

export const fetchWorkshopDifficulties = ({ ...params }) =>
  apiFetch('workshopDifficulties/', params);

export const fetchWorkshops = ({ year, ...params }) =>
  apiFetch(`years/${year}/workshops/`, params);

export const pollVote = ({ survey, formData, ...params }) =>
  apiFetch(`polls/${survey}/vote/`, {
    ...params,
    method: 'POST',
    body: JSON.stringify(formData),
  });

export const signup = ({ formData, ...params }) => apiFetch('register/', {
  ...params,
  method: 'POST',
  body: JSON.stringify(formData),
});

export const resetPassword = ({ formData, ...params }) => apiFetch('password-reset/', {
  ...params,
  method: 'POST',
  body: JSON.stringify(formData),
});

export const changePassword = ({ formData, ...params }) =>
  apiFetchAuthorized('password-change/', {
    ...params,
    method: 'POST',
    body: JSON.stringify(formData),
  });

export const newPassword = ({ formData, ...params }) => apiFetch('password-create/', {
  ...params,
  method: 'POST',
  body: JSON.stringify(formData),
});

export const orderCreate = ({ formData, ...params }) =>
  apiFetchAuthorized('orders/', {
    ...params,
    method: 'POST',
    body: JSON.stringify(formData),
  });

export const orderCancel = ({ order, ...params }) =>
  apiFetchAuthorized(`orders/${order}/`, {
    ...params,
    method: 'DELETE',
  });

export const orderConfirm = ({ order, ...params }) =>
  apiFetchAuthorized(`orders/${order}/?confirm`, {
    ...params,
    method: 'GET',
  });

export const orderChangeWorkshop = ({ formData, order, ...params }) =>
  apiFetchAuthorized(`orders/${order}/`, {
    ...params,
    body: JSON.stringify(formData),
    method: 'PATCH',
  });

export const orderChangeFood = ({ formData, order, ...params }) =>
  apiFetchAuthorized(`ordersFood/${order}/`, {
    ...params,
    body: JSON.stringify(formData),
    method: 'PATCH',
  });

export const login = ({ formData, ...params }) =>
  fetch(`${window.location.protocol}//${window.location.host}/frontend/login`, {
    body: JSON.stringify(formData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...params,
  });

export const logout = ({ auth, ...params }) =>
  fetch(`${window.location.protocol}//${window.location.host}/frontend/logout`, {
    body: JSON.stringify({ token: auth.access_token }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...params,
  });

export const fetchParticipant = params => apiFetchAuthorized('user/', params);

export const fetchParticipantOrders = params => apiFetchAuthorized('orders/', params);

export const updateParticipantLastAction = () => {};

export const fetchMarker = ({ address, ...params }) => fetch(
  'https://maps.googleapis.com/maps/api/geocode/' +
  `json?address=${address}&key=AIzaSyABnfkdNP9H-wCCshO_ZRYxvGoCEozHxzg`,
  params
);
