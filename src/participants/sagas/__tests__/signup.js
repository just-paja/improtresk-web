import sinon from 'sinon';

import { initialize } from 'redux-form';

import { loginWithSignupData, signup } from '../../actions';

import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

describe('Signup saga', () => {
  beforeEach(() => {
    sinon.stub(loginWithSignupData, 'resource');
    sinon.stub(signup, 'resource');
  });

  afterEach(() => {
    loginWithSignupData.resource.restore();
    signup.resource.restore();
  });

  it('submits signup form', () => {
    const sagaTester = getSagaTester({
      form: {
        signup: {
          values: {
            name: 'Tomáš Jireček',
            email: 'test@seznam.cz',
            team: 'Paleťáci',
          },
        },
      },
    });
    signup.resource.returns({
      ok: true,
      status: 200,
      json: () => ({
        name: 'Tomáš Jireček',
      }),
    });
    loginWithSignupData.resource.returns({
      ok: true,
      status: 204,
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(signup());
    expect(signup.resource.getCall(0).args).toContainEqual(expect.objectContaining({
      formData: {
        name: 'Tomáš Jireček',
        email: 'test@seznam.cz',
        team: 'Paleťáci',
      },
    }));
    expect(sagaTester.numCalled(signup.REQUEST)).toBe(1);
    expect(sagaTester.numCalled(signup.SUCCESS)).toBe(1);
  });

  it('logs in with configured password', () => {
    const sagaTester = getSagaTester({});
    signup.resource.returns({
      ok: true,
      status: 204,
    });
    loginWithSignupData.resource.returns({
      ok: true,
      status: 204,
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(initialize(signup.form, {
      email: 'test@test.te',
      password: 'x2341',
    }));
    sagaTester.dispatch(signup.success({
      name: 'Henry Ford',
    }));
    expect(sagaTester.numCalled(loginWithSignupData.REQUEST)).toBe(1);
    expect(loginWithSignupData.resource.getCall(0).args).toContainEqual(expect.objectContaining({
      formData: {
        email: 'test@test.te',
        password: 'x2341',
      },
    }));
  });

  it('saves participant details', () => {
    const sagaTester = getSagaTester({
      form: {
        signup: {
          values: {
            name: 'Tomáš Jireček',
            email: 'test@seznam.cz',
            team: 'Paleťáci',
          },
        },
      },
    });
    loginWithSignupData.resource.returns({
      ok: true,
      status: 200,
      json: () => ({
        name: 'foo',
      }),
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(signup.success({
      name: 'Henry Ford',
    }));
    expect(sagaTester.getState().participants.detail.data).toMatchObject({
      name: 'Henry Ford',
    });
  });
});
