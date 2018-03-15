import sinon from 'sinon';

import * as api from '../../../api';

import getSagaTester from '../../../../mock/sagaTester';
import sagas from '..';

describe('Schedule sagas', () => {
  beforeEach(() => {
    Object.keys(api).forEach(key => sinon.stub(api, key));
  });

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].restore());
  });

  it('fetch events from API', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 15,
              year: '2018',
            },
          ],
        },
      },
    });
    api.fetchScheduleEvents.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 3,
          name: 'Super event',
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'SCHEDULE_EVENTS_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'SCHEDULE_EVENTS_FETCH_STARTED',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'SCHEDULE_EVENTS_FETCH_SUCCESS',
    }));
    expect(api.fetchScheduleEvents.getCall(0).args).toContainEqual(expect.objectContaining({
      year: '2018',
    }));
    expect(sagaTester.getState().schedule.events.data).toMatchObject([
      {
        id: 3,
        name: 'Super event',
      },
    ]);
  });

  it('requires workshops', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 15,
              year: '2018',
            },
          ],
        },
      },
    });
    api.fetchScheduleEvents.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 3,
          name: 'Super event',
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'SCHEDULE_EVENTS_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOPS_REQUIRED',
    }));
  });

  it('requires performers', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 15,
              year: '2018',
            },
          ],
        },
      },
    });
    api.fetchScheduleEvents.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 3,
          name: 'Super event',
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'SCHEDULE_EVENTS_REQUIRED' });
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'PERFORMERS_REQUIRED',
    }));
  });

  it('do not fetch events from API when no years is active', () => {
    const sagaTester = getSagaTester({});
    sagaTester.runAll(sagas);
    sagaTester.dispatch({ type: 'SCHEDULE_EVENTS_REQUIRED' });
    expect(sagaTester.getCalledActions()).not.toContainEqual(expect.objectContaining({
      type: 'SCHEDULE_EVENTS_FETCH_STARTED',
    }));
    expect(api.fetchScheduleEvents.called).toBeFalsy();
  });
});
