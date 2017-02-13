import nock from 'nock';

import { expect } from 'chai';

import * as api from '../../src/web/api';

const apiSource = 'https://private-6502a9-improtreskapi.apiary-mock.com:443/api';

describe('API helper', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetchAccomodation calls for accomodation', () => {
    nock(apiSource)
    .get('/accomodations/')
    .reply(200, []);

    return api.fetchAccomodation({ apiSource })
    .then(() => {
      expect(nock.isDone()).to.equal(true);
    });
  });
  it('fetchConditionsCurrent calls for current conditions', () => {
    nock(apiSource)
      .get('/years/2016/rules/latest/')
      .reply(200, []);

    return api.fetchConditionsCurrent({ year: 2016, apiSource })
    .then(() => {
      expect(nock.isDone()).to.equal(true);
    });
  });
  it('fetchMeals calls for list of meals', () => {
    nock(apiSource)
    .get('/meals/')
    .reply(200, []);

    return api.fetchMeals({ apiSource })
    .then(() => {
      expect(nock.isDone()).to.equal(true);
    });
  });
  it('fetchNews calls for news', () => {
    nock(apiSource)
      .get('/news/')
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
  it('fetchText calls for text', () => {
    nock(apiSource)
    .get('/texts/food-intro-text')
    .reply(200, {});

    return api.fetchText({ apiSource, code: 'food-intro-text' })
    .then(() => {
      expect(nock.isDone()).to.equal(true);
    });
  });
  it('fetchTips calls for tips', () => {
    nock(apiSource)
      .get('/tips/')
      .reply(200, []);

    return api.fetchTips({ apiSource })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('fetchWorkshopDetail calls for workshop detail', () => {
    nock(apiSource)
    .get('/years/2016/workshops/312/')
    .reply(200, []);

    return api.fetchWorkshopDetail({ apiSource, workshop: 312, year: 2016 })
    .then(() => {
      expect(nock.isDone()).to.equal(true);
    });
  });
  it('fetchWorkshops calls for workshops', () => {
    nock(apiSource)
      .get('/years/2016/workshops/')
      .reply(200, []);

    return api.fetchWorkshops({ apiSource, year: 2016 })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('fetchYears calls for news', () => {
    nock(apiSource)
    .get('/years/')
    .reply(200, []);

    return api.fetchYears({ apiSource })
    .then(() => {
      expect(nock.isDone()).to.equal(true);
    });
  });
  it('signup posts signup', () => {
    nock(apiSource)
    .post('/signup/')
    .reply(200, {});

    return api.signup({ apiSource, data: { foo: 'bar' } })
    .then(() => {
      expect(nock.isDone()).to.equal(true);
    });
  });
});
