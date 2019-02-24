import participantDetail from '../participantDetail'

import { participantFetch } from '../../actions'

describe('participantDetail reducer', () => {
  it('returns default state', () => {
    expect(participantDetail()).toMatchObject({
      loading: false,
      data: null
    })
  })

  it('marks as loading on request', () => {
    expect(participantDetail({}, participantFetch.request())).toMatchObject({
      loading: true
    })
  })

  it('marks as loading on success', () => {
    expect(participantDetail(
      {},
      participantFetch.success({ name: 'foo' })
    )).toMatchObject({
      loading: false,
      valid: true,
      data: { name: 'foo' }
    })
  })

  it('marks as loading on failure', () => {
    expect(participantDetail({}, participantFetch.failure('error'))).toMatchObject({
      error: 'error'
    })
  })

  it('saves data on PARTICIPANT_REGISTERED', () => {
    expect(participantDetail({}, {
      type: 'PARTICIPANT_REGISTERED',
      data: { name: 'foo' }
    })).toMatchObject({
      data: { name: 'foo' },
      loading: false,
      valid: true
    })
  })

  it('drops data on PARTICIPANT_LOGOUT', () => {
    expect(participantDetail({}, { type: 'PARTICIPANT_LOGOUT' })).toMatchObject({
      data: null,
      valid: true
    })
  })
})
