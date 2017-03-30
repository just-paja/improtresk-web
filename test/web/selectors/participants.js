import sinon from 'sinon';

import { expect } from 'chai';

import * as transformers from '../../../src/web/transformers/orders';

import {
  getParticipant,
  getParticipantLatestOrder,
  getParticipantUnconfirmedOrder,
} from '../../../src/web/selectors/participant';

describe('Participant selectors', () => {
  beforeEach(() => {
    sinon.stub(transformers, 'aggregateOrderData');
  });
  afterEach(() => {
    transformers.aggregateOrderData.restore();
  });

  it('getParticipant returns participant data', () => {
    expect(getParticipant({
      participant: {
        details: {
          data: {
            id: 684,
          },
        },
      },
    })).to.eql({
      id: 684,
    });
  });
  it('getParticipantLatestOrder returns latest order', () => {
    const aggregatorStub = sinon.stub().returnsArg(0);
    transformers.aggregateOrderData.returns(aggregatorStub);
    expect(getParticipantLatestOrder({
      accomodation: {
        data: [],
      },
      capacity: {},
      meals: {},
      lectors: {
        list: { data: [] },
        roles: { data: [] },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      years: {
        data: [],
      },
      participant: {
        orders: {
          data: [
            {
              id: 1,
              createdAt: '2016-01-01T01:01:01Z',
            },
            {
              id: 3,
              createdAt: '2016-03-03T03:03:03Z',
            },
            {
              id: 2,
              createdAt: '2016-02-02T02:02:02Z',
            },
            {
              id: 22,
              createdAt: '2016-02-02T02:02:02Z',
            },
          ],
        },
      },
    })).to.eql({
      id: 3,
      createdAt: '2016-03-03T03:03:03Z',
    });
  });
  it('getParticipantLatestOrder returns null with no orders', () => {
    const aggregatorStub = sinon.stub().returnsArg(0);
    transformers.aggregateOrderData.returns(aggregatorStub);
    expect(getParticipantLatestOrder({
      accomodation: {
        data: [],
      },
      capacity: {},
      meals: {},
      lectors: {
        list: { data: [] },
        roles: { data: [] },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      years: {
        data: [],
      },
      participant: {
        orders: {
          data: [],
        },
      },
    })).to.eql(null);
  });
  it('getParticipantUnconfirmedOrder returns unconfirmed order', () => {
    const aggregatorStub = sinon.stub().returnsArg(0);
    transformers.aggregateOrderData.returns(aggregatorStub);
    expect(getParticipantUnconfirmedOrder({
      accomodation: {
        data: [],
      },
      capacity: {},
      meals: {},
      lectors: {
        list: { data: [] },
        roles: { data: [] },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      years: {
        data: [],
      },
      participant: {
        orders: {
          data: [
            {
              id: 1,
              createdAt: '2016-01-01T01:01:01Z',
              confirmed: false,
              canceled: false,
              paid: false,
            },
            {
              id: 3,
              createdAt: '2016-03-03T03:03:03Z',
              confirmed: true,
              canceled: false,
              paid: false,
            },
            {
              id: 2,
              createdAt: '2016-02-02T02:02:02Z',
              confirmed: false,
              canceled: true,
              paid: false,
            },
            {
              id: 22,
              createdAt: '2016-02-02T02:02:02Z',
              confirmed: false,
              canceled: false,
              paid: true,
            },
          ],
        },
      },
    })).to.eql({
      id: 1,
      createdAt: '2016-01-01T01:01:01Z',
      confirmed: false,
      canceled: false,
      paid: false,
    });
  });
  it('getParticipantUnconfirmedOrder returns null with no unconfirmed orders', () => {
    const aggregatorStub = sinon.stub().returnsArg(0);
    transformers.aggregateOrderData.returns(aggregatorStub);
    expect(getParticipantUnconfirmedOrder({
      accomodation: {
        data: [],
      },
      capacity: {},
      meals: {},
      lectors: {
        list: { data: [] },
        roles: { data: [] },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      years: {
        data: [],
      },
      participant: {
        orders: {
          data: [],
        },
      },
    })).to.eql(null);
  });
});
