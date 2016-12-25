import nock from 'nock';

import { expect, request } from 'chai';

import runServer from '../../src/server';

process.env.NODE_ENV = 'test';

const apiEndpoint = 'https://private-6502a9-improtreskapi.apiary-mock.com:443/api';

describe('Server', () => {
  let app;

  beforeEach(() => {
    app = runServer({
      logLevel: 'warn',
      port: 3005,
    });
    return app.ready;
  });

  afterEach(() => {
    app.server.close();
  });

  it('returns home title when requesting /', () => {
    nock(apiEndpoint)
      .get('/years')
      .reply(200, []);

    nock(apiEndpoint)
      .get('/news')
      .reply(200, []);

    return request(app)
      .get('/')
      .then((res) => {
        expect(nock.isDone()).to.equal(true);
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
        expect(res.text).to.contain('title');
      });
  });
});
