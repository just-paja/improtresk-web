import moment from 'moment';
import sinon from 'sinon';

import { expect } from 'chai';

import {
  shouldFetchYears,
  yearActive,
  yearActiveNumber,
  yearCurrent,
  yearNext,
  yearsNotCurrent,
  yearsAll,
} from '../../../src/web/selectors/years';

describe('Years selectors', () => {
  it('yearsAll returns all news stored', () => {
    expect(yearsAll({
      years: {
        data: [
          { id: 1 },
          { id: 2 },
        ],
      },
    })).to.eql([
      { id: 1 },
      { id: 2 },
    ]);
  });
  it('yearCurrent returns current year object when available', () => {
    expect(yearCurrent({
      years: {
        data: [
          { id: 1 },
          { id: 2, current: true },
        ],
      },
    })).to.eql({
      id: 2,
      current: true,
    });
  });
  it('yearCurrent returns null when not available', () => {
    expect(yearCurrent({
      years: {
        data: [
          { id: 1 },
          { id: 2 },
        ],
      },
    })).to.equal(null);
  });
  it('shouldFetchYears returns true when years are valid', () => {
    expect(shouldFetchYears({
      years: {
        valid: true,
      },
    })).to.equal(true);
  });
  it('shouldFetchYears returns false when years are not valid', () => {
    expect(shouldFetchYears({
      years: {
        valid: false,
      },
    })).to.equal(false);
  });
  describe('yearNext', () => {
    beforeEach(() => {
      sinon.stub(moment, 'now');
      moment.now.returns('2016-01-02T03:04:05.678');
    });
    afterEach(() => {
      moment.now.restore();
    });
    it('returns next closest year when available', () => {
      expect(yearNext({
        years: {
          data: [
            { id: 1, startDate: '2015-02-03' },
            { id: 3, startDate: '2017-02-03' },
            { id: 2, startDate: '2016-02-03' },
          ],
        },
      })).to.eql({ id: 2, startDate: '2016-02-03' });
    });
    it('returns last year when there is no future year', () => {
      expect(yearNext({
        years: {
          data: [
            { id: 1, startDate: '2014-02-03' },
            { id: 2, startDate: '2015-02-03' },
          ],
        },
      })).to.eql({ id: 2, startDate: '2015-02-03' });
    });
    it('returns null when there no data', () => {
      expect(yearNext({
        years: {
          data: [],
        },
      })).to.equal(null);
    });
  });
  describe('yearsNotCurrent', () => {
    beforeEach(() => {
      sinon.stub(moment, 'now');
      moment.now.returns('2016-01-02T03:04:05.678');
    });
    afterEach(() => {
      moment.now.restore();
    });
    it('returns next closest year when available', () => {
      expect(yearsNotCurrent({
        years: {
          data: [
            { id: 1, endDate: '2015-02-03' },
            { id: 3, endDate: '2017-02-03', current: true },
            { id: 2, endDate: '2016-02-03' },
          ],
        },
      })).to.eql([
        { id: 1, endDate: '2015-02-03' },
      ]);
    });
  });
  describe('yearActive', () => {
    beforeEach(() => {
      sinon.stub(moment, 'now');
      moment.now.returns('2016-01-02T03:04:05.678');
    });
    afterEach(() => {
      moment.now.restore();
    });
    it('returns current year when available', () => {
      expect(yearActive({
        years: {
          data: [
            { id: 1, endDate: '2015-02-03' },
            { id: 3, endDate: '2017-02-03', current: true },
            { id: 2, endDate: '2016-02-03' },
          ],
        },
      })).to.eql({
        id: 3,
        endDate: '2017-02-03',
        current: true,
      });
    });
    it('returns next closest year when current not available', () => {
      expect(yearActive({
        years: {
          data: [
            { id: 1, endDate: '2015-02-03' },
            { id: 3, endDate: '2017-02-03' },
            { id: 2, endDate: '2016-02-03' },
          ],
        },
      })).to.eql({
        id: 2,
        endDate: '2016-02-03',
      });
    });
  });
  describe('yearActiveNumber', () => {
    beforeEach(() => {
      sinon.stub(moment, 'now');
      moment.now.returns('2016-01-02T03:04:05.678');
    });
    afterEach(() => {
      moment.now.restore();
    });
    it('returns current year number when available', () => {
      expect(yearActiveNumber({
        years: {
          data: [
            { id: 1, endDate: '2015-02-03' },
            { id: 3, endDate: '2017-02-03', current: true, year: '2017' },
            { id: 2, endDate: '2016-02-03' },
          ],
        },
      })).to.equal('2017');
    });
    it('returns null when not available', () => {
      expect(yearActiveNumber({
        years: {
          data: [],
        },
      })).to.equal(null);
    });
  });
});
