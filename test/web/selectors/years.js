import moment from 'moment';
import sinon from 'sinon';

import { expect } from 'chai';

import {
  yearCurrent,
  yearNext,
  yearsNotCurrent,
  yearsAll,
} from '../../../src/web/selectors/years';

describe('News selectors', () => {
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
            { id: 1, startAt: '2015-02-03' },
            { id: 3, startAt: '2017-02-03' },
            { id: 2, startAt: '2016-02-03' },
          ],
        },
      })).to.eql({ id: 2, startAt: '2016-02-03' });
    });
    it('returns last year when there is no future year', () => {
      expect(yearNext({
        years: {
          data: [
            { id: 1, startAt: '2014-02-03' },
            { id: 2, startAt: '2015-02-03' },
          ],
        },
      })).to.eql({ id: 2, startAt: '2015-02-03' });
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
            { id: 1, endAt: '2015-02-03' },
            { id: 3, endAt: '2017-02-03', current: true },
            { id: 2, endAt: '2016-02-03' },
          ],
        },
      })).to.eql([
        { id: 1, endAt: '2015-02-03' },
      ]);
    });
  });
});
