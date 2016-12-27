import Grid from 'react-bootstrap/lib/Grid';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import GeneralError from '../../../src/web/components/generalError';

describe('General error component', () => {
  it('renders proper message', () => {
    expect(shallow(
      <GeneralError />
    ).node).to.eql(
      <Grid>
        <h1>Jejda, něco se pokazilo</h1>
        <p>
          Během vašeho požadavku se něco pokazilo a nebyli jsme schopni to vyřídit.
          Zkuste to prosím znovu, potom zkuste chvílil počkat a zkusit to znovu a když
          to nepomůže, tak nám napište.
        </p>
      </Grid>
    );
  });
});
