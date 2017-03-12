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
  url.auth = `${apiId}:${apiSecret}`;
  url.pathname = `${url.pathname}/token/`;
  const urlLogin = format(url);

  app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.send(400, {
        message: 'Invalid request',
      });
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
            errors: ['unauthorized'],
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

  return app;
};
