import nock from 'nock';

import * as api from '../api';

const apiSource = 'https://private-6502a9-improtreskapi.apiary-mock.com:443/api';

describe('API helper', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetchAccomodation calls for accomodation', () => {
    nock(apiSource)
      .get('/years/2017/accomodation/')
      .reply(200, []);

    return api.fetchAccomodation({ apiSource, year: '2017' })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchArchivedYear calls for archived year', () => {
    nock(apiSource)
      .get('/years/2016/')
      .reply(200, []);

    return api.fetchArchivedYear({ apiSource, year: 'foo-2016' })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchCapacity calls for festival capacity', () => {
    nock(apiSource)
      .get('/years/2016/capacity/')
      .reply(200, []);

    return api.fetchCapacity({ year: 2016, apiSource })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchRules calls for current conditions', () => {
    nock(apiSource)
      .get('/years/2016/rules/latest/')
      .reply(200, []);

    return api.fetchRules({ year: 2016, apiSource })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchLectors calls for list of lectors', () => {
    nock(apiSource)
      .get('/lectors/')
      .reply(200, []);

    return api.fetchLectors({ apiSource })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchLectorRoles calls for list of lector roles', () => {
    nock(apiSource)
      .get('/lectorRoles/')
      .reply(200, []);

    return api.fetchLectorRoles({ apiSource })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchMeals calls for list of meals', () => {
    nock(apiSource)
      .get('/years/2017/meals/')
      .reply(200, []);

    return api.fetchMeals({ apiSource, year: '2017' })
      .then(() => {
        expect(nock.isDone()).toBe(true);
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
        expect(nock.isDone()).toBe(true);
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

    return api.fetchNewsDetail({ apiSource, newsId: 'news-detail-1' })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchPerformers calls for performers', () => {
    nock(apiSource)
      .get('/years/2017/performers/')
      .reply(200, []);

    return api.fetchPerformers({ apiSource, year: '2017' })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchScheduleEvents calls for schedule events', () => {
    nock(apiSource)
      .get('/years/2017/schedule/')
      .reply(200, []);

    return api.fetchScheduleEvents({ apiSource, year: '2017' })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchPerformerDetail calls for performers detail', () => {
    nock(apiSource)
      .get('/years/2017/performers/1/')
      .reply(200, {});

    return api.fetchPerformerDetail({ apiSource, performer: 'axss-1', year: '2017' })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchTeams calls for teams', () => {
    nock(apiSource)
      .get('/teams/')
      .reply(200, {});

    return api.fetchTeams({ apiSource })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchText calls for text', () => {
    nock(apiSource)
      .get('/texts/?lang=cs&category=food')
      .reply(200, {});

    return api.fetchText({ apiSource, category: 'food', lang: 'cs' })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchTips calls for tips', () => {
    nock(apiSource)
      .get('/traveling-tips/')
      .reply(200, []);

    return api.fetchTips({ apiSource })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchWorkshopDifficulties calls for workshop difficulties', () => {
    nock(apiSource)
      .get('/workshopDifficulties/')
      .reply(200, []);

    return api.fetchWorkshopDifficulties({ apiSource })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchWorkshopDetail calls for workshop detail', () => {
    nock(apiSource)
      .get('/years/2016/workshops/312/')
      .reply(200, []);

    return api.fetchWorkshopDetail({ apiSource, workshop: 'foo-312', year: 2016 })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchLocations calls for workshop locations', () => {
    nock(apiSource)
      .get('/years/2016/locations/')
      .reply(200, []);

    return api.fetchLocations({ apiSource, year: 2016 })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchWorkshops calls for workshops', () => {
    nock(apiSource)
      .get('/years/2016/workshops/')
      .reply(200, []);

    return api.fetchWorkshops({ apiSource, year: 2016 })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('resetPassword calls for workshops', () => {
    nock(apiSource)
      .post('/password-reset/', {
        resetPassword: 'foo',
      })
      .reply(200, []);

    return api.resetPassword({
      apiSource,
      formData: {
        resetPassword: 'foo',
      },
    })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('changePassword calls for password change', () => {
    nock(apiSource, {
      reqheaders: {
        authorization: 'Bearer x123',
      },
    })
      .post('/password-change/', {
        changePassword: 'foo',
      })
      .reply(200, []);

    return api.changePassword({
      apiSource,
      auth: {
        access_token: 'x123',
      },
      formData: {
        changePassword: 'foo',
      },
    })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('newPassword calls for workshops', () => {
    nock(apiSource)
      .post('/password-create/', {
        newPassword: 'foo',
      })
      .reply(200, []);

    return api.newPassword({
      apiSource,
      formData: {
        newPassword: 'foo',
      },
    })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('orderCreate calls order create endpoint', () => {
    nock(apiSource, {
      reqheaders: {
        authorization: 'Bearer x123',
      },
    })
      .post('/orders/', {
        foo: 'bar',
      })
      .reply(200, []);

    return api.orderCreate({
      apiSource,
      auth: {
        access_token: 'x123',
      },
      formData: {
        foo: 'bar',
      },
      order: 10,
    }).then(() => {
      expect(nock.isDone()).toBe(true);
    });
  });

  it('orderChangeWorkshop calls order change endpoint', () => {
    nock(apiSource, {
      reqheaders: {
        authorization: 'Bearer x123',
      },
    })
      .patch('/orders/10/', {
        foo: 'bar',
      })
      .reply(200, []);

    return api.orderChangeWorkshop({
      apiSource,
      auth: {
        access_token: 'x123',
      },
      formData: {
        foo: 'bar',
      },
      order: 10,
    }).then(() => {
      expect(nock.isDone()).toBe(true);
    });
  });

  it('orderChangeFood calls order food change endpoint', () => {
    nock(apiSource, {
      reqheaders: {
        authorization: 'Bearer x123',
      },
    })
      .patch('/ordersFood/10/', {
        foo: 'bar',
      })
      .reply(200, []);

    return api.orderChangeFood({
      apiSource,
      auth: {
        access_token: 'x123',
      },
      formData: {
        foo: 'bar',
      },
      order: 10,
    }).then(() => {
      expect(nock.isDone()).toBe(true);
    });
  });

  it('fetchYears calls for years', () => {
    nock(apiSource)
      .get('/years/')
      .reply(200, []);

    return api.fetchYears({ apiSource })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('pollVote posts poll vote', () => {
    nock(apiSource)
      .post('/polls/4/vote/', { vote: 5 })
      .reply(200, []);

    return api.pollVote({ apiSource, survey: 4, formData: { vote: 5 } })
      .then(() => {
        expect(nock.isDone()).toBe(true);
      });
  });

  it('register posts register', () => {
    nock(apiSource)
      .post('/register/')
      .reply(201, {});

    return api.signup({ apiSource, data: { foo: 'bar' } })
      .then(() => {
        expect(nock.isDone()).toBe(true);
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
        expect(nock.isDone()).toBe(true);
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
        expect(nock.isDone()).toBe(true);
      });
  });

  it('fetchParticipant calls for participant details', () => {
    nock(apiSource, {
      reqheaders: {
        authorization: 'Bearer a23',
      },
    })
      .get('/user/')
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
        expect(json).toEqual({
          id: 1,
          name: 'Keith Johnstonne',
        });
        expect(nock.isDone()).toBe(true);
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
        expect(json).toEqual({
          id: 1,
          name: 'Keith Johnstonne',
        });
        expect(nock.isDone()).toBe(true);
      });
  });

  it('login calls frontend login path', () => {
    nock('http://localhost')
      .post('/frontend/login', {
        login: 'foo',
        password: 'bar',
      })
      .reply(200, { message: 'logged-in' });

    return api.login({
      apiSource,
      formData: {
        login: 'foo',
        password: 'bar',
      },
    })
      .then(res => res.json())
      .then((json) => {
        expect(json).toEqual({ message: 'logged-in' });
        expect(nock.isDone()).toBe(true);
      });
  });

  it('logout calls frontend logout path', () => {
    nock('http://localhost')
      .post('/frontend/logout', {
        token: 'foo',
      })
      .reply(200, { message: 'logged-out' });

    return api.logout({
      apiSource,
      auth: {
        access_token: 'foo',
      },
    })
      .then(res => res.json())
      .then((json) => {
        expect(json).toEqual({ message: 'logged-out' });
        expect(nock.isDone()).toBe(true);
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
        expect(nock.isDone()).toBe(true);
      });
  });
});
