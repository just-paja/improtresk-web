// eslint-disable-next-line import/no-extraneous-dependencies
import sinon from 'sinon';

import * as api from '../src/api';

export const stubApi = () => Object.keys(api).forEach(key => sinon.stub(api, key));

export const restoreApi = () => Object.keys(api).forEach(key => api[key].restore());

export const stubApiAndRecover = () => {
  beforeEach(() => {
    stubApi();
  });

  afterEach(() => {
    restoreApi();
  });
};

export default api;
