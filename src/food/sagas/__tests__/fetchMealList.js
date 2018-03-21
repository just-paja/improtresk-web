import sinon from 'sinon';

import { mealListFetch } from '../../actions';

import getSagaTester from '../../../../mock/sagaTester';
import sagas from '..';

describe('fetchMealList saga', () => {
  beforeEach(() => {
    sinon.stub(mealListFetch, 'resource');
  });

  afterEach(() => {
    mealListFetch.resource.restore();
  });

  it('fetchMeals creates fetch actions with year', () => {
    const sagaTester = getSagaTester();
    mealListFetch.resource.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 40,
          name: 'Foo',
        },
      ]),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(mealListFetch());
    expect(sagaTester.numCalled(mealListFetch.REQUEST)).toBe(1);
    expect(sagaTester.getState().food.list.data).toEqual([
      {
        id: 40,
        name: 'Foo',
      },
    ]);
  });
});
