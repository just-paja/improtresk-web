import { expect } from 'chai';

import participantDetails from '../../../src/web/reducers/participantDetails';

describe('Participant Details reducer', () => {
  it('returns default state', () => {
    expect(participantDetails()).to.eql({
      loading: false,
      data: null,
    });
  });
  it('marks as loading on PARTICIPANT_FETCH_STARTED', () => {
    expect(participantDetails({}, { type: 'PARTICIPANT_FETCH_STARTED' })).to.eql({
      loading: true,
    });
  });
  it('marks as loading on PARTICIPANT_FETCH_SUCCESS', () => {
    expect(participantDetails(
      {},
      {
        type: 'PARTICIPANT_FETCH_SUCCESS',
        data: [
          { name: 'foo' },
        ],
      }
    )).to.eql({
      loading: false,
      ready: true,
      valid: true,
      data: [
        { name: 'foo' },
      ],
    });
  });
  it('marks as loading on PARTICIPANT_FETCH_ERROR', () => {
    expect(participantDetails({}, { type: 'PARTICIPANT_FETCH_ERROR', error: 'error' })).to.eql({
      loading: false,
      ready: true,
      error: 'error',
    });
  });
  it('saves data on PARTICIPANT_REGISTERED', () => {
    expect(participantDetails({}, {
      type: 'PARTICIPANT_REGISTERED',
      data: { name: 'foo' },
    })).to.eql({
      data: { name: 'foo' },
      loading: false,
      ready: true,
      valid: true,
    });
  });
  it('drops data on PARTICIPANT_LOGOUT', () => {
    expect(participantDetails({}, { type: 'PARTICIPANT_LOGOUT' })).to.eql({
      data: null,
      ready: false,
      valid: false,
    });
  });
});
