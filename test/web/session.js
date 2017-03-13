import sinon from 'sinon';

import { expect } from 'chai';

import {
  validateGuest,
  validateLogin,
} from '../../src/web/session';

import * as api from '../../src/web/api';
import * as sessionSelectors from '../../src/web/selectors/session';

describe('Session', () => {
  describe('validateLogin when participant is logged in', () => {
    beforeEach(() => {
      sinon.stub(api, 'updateParticipantLastAction');
      sinon.stub(sessionSelectors, 'isLoggedIn');
      sessionSelectors.isLoggedIn.returns(true);
    });
    afterEach(() => {
      api.updateParticipantLastAction.restore();
      sessionSelectors.isLoggedIn.restore();
    });
    it('updates last user action date', () => {
      validateLogin(() => {})({}, () => {});
      expect(api.updateParticipantLastAction.calledOnce).to.equal(true);
    });
    it('does not replace url', () => {
      const replaceSpy = sinon.spy();
      validateLogin(() => {})({}, replaceSpy);
      expect(replaceSpy.calledOnce).to.equal(false);
    });
  });

  describe('validateLogin when participant is not recognized', () => {
    beforeEach(() => {
      sinon.stub(sessionSelectors, 'isLoggedIn');
      sessionSelectors.isLoggedIn.returns(false);
    });
    afterEach(() => {
      sessionSelectors.isLoggedIn.restore();
    });
    it('replaces url to login', () => {
      const replaceSpy = sinon.spy();
      validateLogin(() => {})({}, replaceSpy);
      expect(replaceSpy.args).to.eql([
        ['/prihlaska'],
      ]);
    });
  });

  describe('validateGuest when participant is logged in', () => {
    beforeEach(() => {
      sinon.stub(sessionSelectors, 'isLoggedIn');
      sessionSelectors.isLoggedIn.returns(true);
    });
    afterEach(() => {
      sessionSelectors.isLoggedIn.restore();
    });
    it('replaces url to participant home', () => {
      const replaceSpy = sinon.spy();
      validateGuest(() => {})({}, replaceSpy);
      expect(replaceSpy.args).to.eql([
        ['/ucastnik'],
      ]);
    });
  });

  describe('validateGuest when participant is not recognized', () => {
    beforeEach(() => {
      sinon.stub(sessionSelectors, 'isLoggedIn');
      sessionSelectors.isLoggedIn.returns(false);
    });
    afterEach(() => {
      sessionSelectors.isLoggedIn.restore();
    });
    it('does not replace url', () => {
      const replaceSpy = sinon.spy();
      validateGuest(() => {})({}, replaceSpy);
      expect(replaceSpy.called).to.equal(false);
    });
  });
});
