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
});
