import React from 'react';

import { shallow } from 'enzyme';

import Container from '../Container';
import GeneralError from '../GeneralError';

describe('General error component', () => {
  it('renders proper message', () => {
    expect(shallow(
      <GeneralError />
    ).getElement()).toEqual(
      <Container>
        <h1>Jejda, něco se pokazilo</h1>
        <p>
          Během vašeho požadavku se něco pokazilo a nebyli jsme schopni to vyřídit.
          Zkuste to prosím znovu, potom zkuste chvílil počkat a zkusit to znovu a když
          to nepomůže, tak nám napište.
        </p>
      </Container>
    );
  });
});
