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
  it('fetchArchivedYear calls for archived year', () => {
    nock(apiSource)
      .get('/years/2016/')
      .reply(200, []);

    return api.fetchArchivedYear({ apiSource, year: 2016 })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('fetchCapacity calls for festival capacity', () => {
    nock(apiSource)
      .get('/years/2016/capacity/')
      .reply(200, []);

    return api.fetchCapacity({ year: 2016, apiSource })
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
  it('fetchLectors calls for list of lectors', () => {
    nock(apiSource)
      .get('/lectors/')
      .reply(200, []);

    return api.fetchLectors({ apiSource })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('fetchLectorRoles calls for list of lector roles', () => {
    nock(apiSource)
      .get('/lectorRoles/')
      .reply(200, []);

    return api.fetchLectorRoles({ apiSource })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('fetchMeals calls for list of meals', () => {
    nock(apiSource)
      .get('/years/2017/meals/')
      .reply(200, []);

    return api.fetchMeals({ apiSource, year: '2017' })
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
  it('fetchNewsDetail calls for news detail', () => {
    nock(apiSource)
      .get('/news/1/')
      .reply(200, {
        id: 1,
        text: 'Organizace Improtřesku začíná. Sestavili jsme nový organizační tým a už to jede!',
        createdAt: '2016-11-29T18:29:31',
      });

    return api.fetchNewsDetail({ apiSource, news: 1 })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('fetchPerformers calls for performers', () => {
    nock(apiSource)
      .get('/years/2017/performers/')
      .reply(200, []);

    return api.fetchPerformers({ apiSource, year: '2017' })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('fetchScheduleEvents calls for schedule events', () => {
    nock(apiSource)
      .get('/years/2017/schedule/')
      .reply(200, []);

    return api.fetchScheduleEvents({ apiSource, year: '2017' })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('fetchPerformerDetail calls for performers detail', () => {
    nock(apiSource)
      .get('/years/2017/performers/1/')
      .reply(200, {});

    return api.fetchPerformerDetail({ apiSource, performer: 1, year: '2017' })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('fetchTeams calls for teams', () => {
    nock(apiSource)
      .get('/teams/')
      .reply(200, {});

    return api.fetchTeams({ apiSource })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('fetchText calls for text', () => {
    nock(apiSource)
      .get('/texts/food-intro-text/')
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
  it('fetchWorkshopDifficulties calls for workshop difficulties', () => {
    nock(apiSource)
      .get('/workshopDifficulties/')
      .reply(200, []);

    return api.fetchWorkshopDifficulties({ apiSource })
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
  it('fetchWorkshopLocations calls for workshop locations', () => {
    nock(apiSource)
      .get('/years/2016/locations/')
      .reply(200, []);

    return api.fetchWorkshopLocations({ apiSource, year: 2016 })
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
  it('fetchYears calls for years', () => {
    nock(apiSource)
      .get('/years/')
      .reply(200, []);

    return api.fetchYears({ apiSource })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('pollVote posts poll vote', () => {
    nock(apiSource)
      .post('/polls/4/vote/', { vote: 5 })
      .reply(200, []);

    return api.pollVote({ apiSource, survey: 4, data: { vote: 5 } })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('register posts register', () => {
    nock(apiSource)
      .post('/register/')
      .reply(201, {});

    return api.signup({ apiSource, data: { foo: 'bar' } })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('orderConfirm posts order confirm', () => {
    nock(apiSource, {
      reqheaders: {
        authorization: 'Bearer a23',
      },
    })
      .get('/orders/1/')
      .query({ confirm: undefined })
      .reply(200, {});

    return api.orderConfirm({
      order: 1,
      apiSource,
      auth: {
        access_token: 'a23',
      },
    })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('orderCancel posts order confirm', () => {
    nock(apiSource, {
      reqheaders: {
        authorization: 'Bearer a23',
      },
    })
      .delete('/orders/1/')
      .reply(200, {});

    return api.orderCancel({
      order: 1,
      apiSource,
      auth: {
        access_token: 'a23',
      },
    })
      .then(() => {
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('fetchParticipant calls for participant details', () => {
    nock(apiSource, {
      reqheaders: {
        authorization: 'Bearer a23',
      },
    })
      .get('/whoAmI/')
      .reply(200, {
        id: 1,
        name: 'Keith Johnstonne',
      });

    return api.fetchParticipant({
      apiSource,
      auth: {
        access_token: 'a23',
      },
    })
      .then(res => res.json())
      .then((json) => {
        expect(json).to.eql({
          id: 1,
          name: 'Keith Johnstonne',
        });
        expect(nock.isDone()).to.equal(true);
      });
  });
  it('fetchParticipantOrders calls for participant orders', () => {
    nock(apiSource, {
      reqheaders: {
        authorization: 'Bearer a23',
      },
    })
      .get('/orders/')
      .reply(200, {
        id: 1,
        name: 'Keith Johnstonne',
      });

    return api.fetchParticipantOrders({
      apiSource,
      auth: {
        access_token: 'a23',
      },
    })
      .then(res => res.json())
      .then((json) => {
        expect(json).to.eql({
          id: 1,
          name: 'Keith Johnstonne',
        });
        expect(nock.isDone()).to.equal(true);
      });
  });

  it('fetchMarker fetches marker from Google API', () => {
    nock('https://maps.googleapis.com/maps/api')
      .get('/geocode/json')
      .query({
        address: 'Nádražní 21',
        key: 'AIzaSyABnfkdNP9H-wCCshO_ZRYxvGoCEozHxzg',
      })
      .reply(201, {});

    return api.fetchMarker({ apiSource, address: 'Nádražní 21' })
    .then(() => {
      expect(nock.isDone()).to.equal(true);
    });
  });
});
