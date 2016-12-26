import sinon from 'sinon';

import { expect } from 'chai';

import * as storeDefinition from '../../src/web/store';

describe('Store', () => {
  describe('with window and devtools', () => {
    const devtools = sinon.spy();
    let oldWindow;

    beforeEach(() => {
      global.window = {
        devToolsExtension: () => devtools,
      };
    });

    afterEach(() => {
      global.window = oldWindow;
    });

    it('configures the store with devTools', () => {
      expect(storeDefinition.getDevTools()).to.equal(devtools);
    });
  });

  it('configures the initial state', () => {
    expect(storeDefinition.default().getState().device).to.eql({
      isMobile: false,
    });
  });

  it('configures the initial state as specified', () => {
    expect(storeDefinition.default({
      device: { isMobile: true },
    }).getState().device).to.eql({
      isMobile: true,
    });
  });
});
