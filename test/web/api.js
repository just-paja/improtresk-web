import nock from 'nock';

import { expect } from 'chai';

import * as api from '../../src/api';

const apiEndpoint = 'https://private-6502a9-improtreskapi.apiary-mock.com:443/api';

describe('API helper', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetchNews calls for news', () => {
    nock(apiEndpoint)
      .get('/news')
      .reply(200, [
        {
          id: 2,
          text: 'Zveřejnili jsme všechny workshopy. Přihlašovat se můžete od 1. března.',
          createdAt: '2016-11-30T18:29:31',
        },
        {
          id: 1,
          text: 'Organizace Improtřesku začíná. Sestavili jsme nový organizační tým a už to jede!',
          createdAt: '2016-11-29T18:29:31',
        },
      ]);

    return api.fetchNews()
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });

  it('fetchYears calls for news', () => {
    nock(apiEndpoint)
      .get('/years')
      .reply(200, []);

    return api.fetchYears()
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });

  it('fetchTips calls for tips', () => {
    nock(apiEndpoint)
      .get('/tips')
      .reply(200, []);

    return api.fetchTips()
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });

  it('fetchWorkshops calls for workshops', () => {
    nock(apiEndpoint)
      .get('/workshops')
      .reply(200, []);

    return api.fetchWorkshops()
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });

  it('fetchWorkshopDetail calls for workshop detail', () => {
    nock(apiEndpoint)
      .get('/workshops/312')
      .reply(200, []);

    return api.fetchWorkshopDetail({ workshop: 312 })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });

  it('fetchConditionsCurrent calls for current conditions', () => {
    nock(apiEndpoint)
      .get('/conditions')
      .reply(200, []);

    return api.fetchConditionsCurrent()
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
});
