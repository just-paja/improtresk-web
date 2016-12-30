import nock from 'nock';

import { expect } from 'chai';

import * as api from '../../src/web/api';

const apiSource = 'https://private-6502a9-improtreskapi.apiary-mock.com:443/api';

describe('API helper', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetchNews calls for news', () => {
    nock(apiSource)
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

    return api.fetchNews({ apiSource })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });

  it('fetchYears calls for news', () => {
    nock(apiSource)
      .get('/years')
      .reply(200, []);

    return api.fetchYears({ apiSource })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });

  it('fetchTips calls for tips', () => {
    nock(apiSource)
      .get('/tips')
      .reply(200, []);

    return api.fetchTips({ apiSource })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });

  it('fetchWorkshops calls for workshops', () => {
    nock(apiSource)
      .get('/workshops')
      .reply(200, []);

    return api.fetchWorkshops({ apiSource })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });

  it('fetchWorkshopDetail calls for workshop detail', () => {
    nock(apiSource)
      .get('/workshops/312')
      .reply(200, []);

    return api.fetchWorkshopDetail({ apiSource, workshop: 312 })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });

  it('fetchConditionsCurrent calls for current conditions', () => {
    nock(apiSource)
      .get('/conditions')
      .reply(200, []);

    return api.fetchConditionsCurrent({ apiSource })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
});
