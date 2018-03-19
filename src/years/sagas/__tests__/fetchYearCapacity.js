import sinon from 'sinon';

import * as api from '../../../api';

import getSagaTester from '../../../../mock/sagaTester';
import sagas from '..';

describe('Capacity sagas', () => {
  let clock;
  beforeEach(() => {
    clock = sinon.useFakeTimers();
    Object.keys(api).forEach(key => sinon.stub(api, key));
  });

  afterEach(() => {
    clock.restore();
    Object.keys(api).forEach(key => api[key].restore());
  });

  it('fetch capacity from API', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 20,
              year: '2018',
            },
          ],
        },
      },
    });
    api.fetchCapacity.returns({
      ok: true,
      status: 200,
      json: () => ({
        workshops: {},
        accomodation: {},
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'YEAR_CAPACITY_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_FETCH_SUCCESS',
    }));
    expect(api.fetchCapacity.calledOnce).toBeTruthy();
    expect(api.fetchCapacity.getCall(0).args).toContainEqual(expect.objectContaining({
      year: '2018',
    }));
    expect(sagaTester.getState().years.capacity.data).toMatchObject({
      workshops: {},
      accomodation: {},
    });
  });

  it('do not fetch capacity when no year is active', () => {
    const sagaTester = getSagaTester({});
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'YEAR_CAPACITY_REQUIRED' });
    expect(sagaTester.getCalledActions()).not.toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_FETCH_STARTED',
    }));
    expect(api.fetchCapacity.called).toBeFalsy();
  });

  it('poll capacity from API on poll cycle end and renews poll cycle', () => {
    const sagaTester = getSagaTester({
      years: {
        capacity: {
          polling: true,
        },
        list: {
          data: [
            {
              id: 20,
              year: '2018',
            },
          ],
        },
      },
    });
    api.fetchCapacity.returns({
      ok: true,
      status: 200,
      json: () => ({
        workshops: {},
        accomodation: {},
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'YEAR_CAPACITY_POLL_CYCLE_FINISHED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_UPDATE_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_UPDATE_SUCCESS',
    }));
    expect(api.fetchCapacity.calledOnce).toBeTruthy();
    expect(api.fetchCapacity.getCall(0).args).toContainEqual(expect.objectContaining({
      year: '2018',
    }));
    expect(sagaTester.getState().years.capacity.data).toMatchObject({
      workshops: {},
      accomodation: {},
    });
    clock.tick(8000);
    return sagaTester.waitFor('YEAR_CAPACITY_POLL_CYCLE_FINISHED', true);
  });

  it('poll capacity from API on poll cycle end and do not renew poll cycle when polling is off', () => {
    const sagaTester = getSagaTester({
      years: {
        capacity: {
          polling: false,
        },
        list: {
          data: [
            {
              id: 20,
              year: '2018',
            },
          ],
        },
      },
    });
    api.fetchCapacity.returns({
      ok: true,
      status: 200,
      json: () => ({
        workshops: {},
        accomodation: {},
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'YEAR_CAPACITY_POLL_CYCLE_FINISHED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_UPDATE_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_UPDATE_SUCCESS',
    }));
    expect(api.fetchCapacity.calledOnce).toBeTruthy();
    expect(api.fetchCapacity.getCall(0).args).toContainEqual(expect.objectContaining({
      year: '2018',
    }));
    expect(sagaTester.getState().years.capacity.data).toMatchObject({
      workshops: {},
      accomodation: {},
    });
    clock.tick(8000);
    expect(sagaTester.numCalled('YEAR_CAPACITY_POLL_CYCLE_FINISHED')).toBe(1);
  });

  it('do not poll capacity when no year is active', () => {
    const sagaTester = getSagaTester({});
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'YEAR_CAPACITY_POLL_CYCLE_FINISHED' });
    expect(sagaTester.getCalledActions()).not.toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_UPDATE_STARTED',
    }));
    expect(api.fetchCapacity.called).toBeFalsy();
  });

  it('fetch capacity and then starts polling when required both', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 20,
              year: '2018',
            },
          ],
        },
      },
    });
    api.fetchCapacity.returns({
      ok: true,
      status: 200,
      json: () => ({
        workshops: {},
        accomodation: {},
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'YEAR_CAPACITY_POLL_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_POLL_START',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_FETCH_STARTED',
    }));
    clock.tick(8000);
    return sagaTester.waitFor('YEAR_CAPACITY_POLL_START').then(() => {
      expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
        type: 'YEAR_CAPACITY_UPDATE_STARTED',
      }));
    });
  });

  it('fetch capacity and does not start polling when it is off', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 20,
              year: '2018',
            },
          ],
        },
      },
    });
    api.fetchCapacity.returns({
      ok: true,
      status: 200,
      json: () => ({
        workshops: {},
        accomodation: {},
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'YEAR_CAPACITY_POLL_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_POLL_START',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_FETCH_STARTED',
    }));
    sagaTester.dispatch({ type: 'YEAR_CAPACITY_POLL_STOP' });
    clock.tick(8000);
    return sagaTester.waitFor('YEAR_CAPACITY_POLL_START').then(() => {
      expect(sagaTester.getCalledActions()).not.toContainEqual(expect.objectContaining({
        type: 'YEAR_CAPACITY_UPDATE_STARTED',
      }));
    });
  });

  it('stops poll when requested', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 20,
              year: '2018',
            },
          ],
        },
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'YEAR_CAPACITY_POLL_STOP_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_CAPACITY_POLL_STOP',
    }));
    expect(sagaTester.getState().years.capacity).toHaveProperty('polling', false);
  });
});
