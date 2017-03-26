import moment from 'moment';
import sinon from 'sinon';

import { expect } from 'chai';

import {
  areSignupsOpen,
  getSignupsCloseDate,
  getSignupsOpenDate,
} from '../../../src/web/selectors/signups';

describe('Signup selectors', () => {
  beforeEach(() => {
    sinon.stub(moment, 'now');
    moment.now.returns('2016-01-02T03:04:05.678');
  });
  afterEach(() => {
    moment.now.restore();
  });
  it('getSignupsOpenDate returns null when there is no current year', () => {
    expect(getSignupsOpenDate({
      years: {
        data: [],
      },
    })).to.equal(null);
  });
  it('getSignupsOpenDate returns null when year has no signup date', () => {
    expect(getSignupsOpenDate({
      years: {
        data: [
          {
            id: 1,
            current: true,
          },
        ],
      },
    })).to.equal(null);
  });
  it('getSignupsOpenDate returns date when year has signup date', () => {
    expect(getSignupsOpenDate({
      years: {
        data: [
          {
            id: 1,
            current: true,
            startSignupsAt: '2016-01-02T03:04:05',
          },
        ],
      },
    })).to.equal('2016-01-02T03:04:05');
  });
  it('getSignupsCloseDate returns null when there is no current year', () => {
    expect(getSignupsCloseDate({
      years: {
        data: [],
      },
    })).to.equal(null);
  });
  it('getSignupsCloseDate returns null when year has no signup date', () => {
    expect(getSignupsCloseDate({
      years: {
        data: [
          {
            id: 1,
            current: true,
          },
        ],
      },
    })).to.equal(null);
  });
  it('getSignupsCloseDate returns date when year has signup date', () => {
    expect(getSignupsCloseDate({
      years: {
        data: [
          {
            id: 1,
            current: true,
            startDate: '2016-01-02',
          },
        ],
      },
    })).to.equal('2016-01-02');
  });
  it('areSignupsOpen returns false when year signup start date is not available', () => {
    expect(areSignupsOpen({
      session: {},
      years: {
        data: [
          {
            id: 1,
            current: true,
            startDate: '2016-02-03',
          },
        ],
        forceOpen: false,
      },
    })).to.equal(false);
  });
  it('areSignupsOpen returns false when year signup start date is after current time', () => {
    expect(areSignupsOpen({
      session: {},
      years: {
        data: [
          {
            id: 1,
            current: true,
            startDate: '2016-01-09T03:04:05',
            startSignupsAt: '2016-01-03T03:04:05',
          },
        ],
        forceOpen: false,
      },
    })).to.equal(false);
  });
  it('areSignupsOpen returns false when year signup end date is not available', () => {
    expect(areSignupsOpen({
      session: {},
      years: {
        data: [
          {
            id: 1,
            current: true,
          },
        ],
      },
    })).to.equal(false);
  });
  it('areSignupsOpen returns false when year signup end date is before current time', () => {
    expect(areSignupsOpen({
      session: {},
      years: {
        data: [
          {
            id: 1,
            current: true,
            startDate: '2015-01-09T03:04:05',
            startSignupsAt: '2015-01-03T03:04:05',
          },
        ],
        forceOpen: false,
      },
    })).to.equal(false);
  });
  it('areSignupsOpen returns true when forced', () => {
    expect(areSignupsOpen({
      session: {
        forceOpenSignups: true,
      },
      years: {
        data: [
          {
            id: 1,
            current: true,
            startDate: '2016-02-01',
            startSignupsAt: '2016-01-01T03:04:05',
          },
        ],
      },
    })).to.equal(true);
  });
  it('areSignupsOpen returns true when year signup start date is before and end date after current time', () => {
    expect(areSignupsOpen({
      session: {},
      years: {
        data: [
          {
            id: 1,
            current: true,
            startDate: '2016-02-01',
            startSignupsAt: '2016-01-01T03:04:05',
          },
        ],
        forceOpen: false,
      },
    })).to.equal(true);
  });
});
