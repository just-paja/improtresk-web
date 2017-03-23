/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiJsx from 'jsx-chai';
import cssHook from 'css-modules-require-hook';
import moment from 'moment-timezone';

cssHook({
  generateScopedName: '[name]-[local]',
});

chai.use(chaiHttp);
chai.use(chaiJsx);

moment.tz.setDefault('UTC');
