import { expect, request } from 'chai';

import runServer from '../../src/server';

process.env.NODE_ENV = 'test';

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

  it('returns home title when requesting /', () =>
    request(app)
      .get('/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
        expect(res.text).to.contain('title');
      })
  );
});
