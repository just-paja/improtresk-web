import Alert from 'react-bootstrap/lib/Alert';
import FontAwesome from 'react-fontawesome';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import FormErrors from '../../../src/web/components/formErrors';

describe('FormErrors component', () => {
  it('renders without current year', () => {
    expect(shallow(
      <FormErrors
        errors={['Cannot save data', 'unauthorized', 'api-error']}
      />
    ).node).to.eql(
      <div>
        <Alert key="Cannot save data" bsStyle="danger">
          <FontAwesome name="exclamation-triangle" />
          {' '}Neznámá chyba: Cannot save data
        </Alert>
        <Alert key="unauthorized" bsStyle="danger">
          <FontAwesome name="exclamation-triangle" />
          {' '}Neplatná kombinace uživatelského jména nebo hesla
        </Alert>
        <Alert key="api-error" bsStyle="danger">
          <FontAwesome name="exclamation-triangle" />
          {' '}Chyba komunikace s API
        </Alert>
      </div>
    );
  });
});
