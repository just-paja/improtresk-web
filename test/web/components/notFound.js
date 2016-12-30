import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Container from '../../../src/web/components/container';
import NotFound from '../../../src/web/components/notFound';

describe('Not Found error component', () => {
  it('renders proper message', () => {
    expect(shallow(
      <NotFound />
    ).node).to.eql(
      <Container>
        <h1>Stránka nenalezena</h1>
        <p>
          Stránka kterou hledáte nebyla nalezena. Zkontrolujte prosím URL a zeptejte se
          toho kdo vám dal odkaz jestli vás opravdu chtěl odkázat sem.
        </p>
      </Container>
    );
  });
});
