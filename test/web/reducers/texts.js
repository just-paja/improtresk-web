import { expect } from 'chai';

import texts from '../../../src/web/reducers/texts';

describe('Texts reducer', () => {
  it('returns default state', () => {
    expect(texts()).to.eql({});
  });
  it('marks as loading on TEXT_FETCH_STARTED', () => {
    expect(texts({}, {
      code: 'ACCOMODATION_INTRO',
      type: 'TEXT_FETCH_STARTED',
    })).to.eql({
      ACCOMODATION_INTRO: {
        data: {},
        loading: true,
      },
    });
  });
  it('marks as loading on TEXT_FETCH_SUCCESS', () => {
    expect(texts(
      {},
      {
        type: 'TEXT_FETCH_SUCCESS',
        code: 'ACCOMODATION_INTRO',
        data: {
          text: 'foo',
        },
      }
    )).to.eql({
      ACCOMODATION_INTRO: {
        loading: false,
        ready: true,
        valid: true,
        data: {
          text: 'foo',
        },
      },
    });
  });
  it('marks as loading on TEXT_FETCH_ERROR', () => {
    expect(texts(
      {},
      {
        type: 'TEXT_FETCH_ERROR',
        code: 'ACCOMODATION_INTRO',
        error: 'error',
      }
    )).to.eql({
      ACCOMODATION_INTRO: {
        data: {},
        loading: false,
        ready: true,
        error: 'error',
      },
    });
  });
});
