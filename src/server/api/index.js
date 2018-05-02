import encodeForm from 'form-urlencoded';
import express from 'express';
import fetch from 'isomorphic-fetch';
import winston from 'winston';

import { format, parse } from 'url';

export default ({
  apiAuthSource,
  apiId,
  apiSecret,
}) => {
  const app = express();
  const url = parse(apiAuthSource);
  const base = url.pathname;
  url.auth = `${apiId}:${apiSecret}`;
  url.pathname = `${base}/token/`;
  const urlLogin = format(url);

  url.pathname = `${base}/revoke_token/`;
  const urlLogout = format(url);

  app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ messages: ['invalid-request'] });
    }

    return fetch(urlLogin, {
      method: 'post',
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: encodeForm({
        grant_type: 'password',
        scope: 'write',
        username: req.body.email,
        password: req.body.password,
      }),
    })
      .then(apiRes => apiRes.text())
      .then((text) => {
        let json;
        try {
          json = JSON.parse(text);
        } catch (e) {
          winston.info(text);
          winston.error(e);
        }

        if (!json || !json.access_token) {
          return res.status(401).send({
            errors: ['participants.failedLogin'],
            message: json,
          });
        }
        return res.status(200).send(JSON.stringify(json));
      })
      .catch((e) => {
        winston.error(e);
        res.status(500).send({
          errors: ['api-error'],
          message: e.message,
        });
      });
  });

  app.post('/logout', (req, res) =>
    fetch(urlLogout, {
      method: 'post',
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: encodeForm({
        client_id: apiId,
        client_secret: apiSecret,
        token: req.body.token,
      }),
    })
      .then((apiRes) => {
        if (apiRes.status === 200) {
          return res.status(204).send();
        }
        return res.status(400).send({
          errors: ['unauthorized'],
        });
      })
      .catch((e) => {
        winston.error(e);
        res.status(500).send({
          errors: ['api-error'],
          message: e.message,
        });
      })
  );

  return app;
};
