import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import AppErrors from '../../../src/web/components/appErrors';
import Container from '../../../src/web/components/container';

describe('App Errors component', () => {
  it('renders a problem warning with unknown message', () => {
    expect(shallow(
      <AppErrors
        errors={['foo']}
      />
    ).node).to.eql(
      <Container>
        <h1>Jejda, něco se pokazilo</h1>
        <p>
          Stránku se nepovedlo vykreslit, protože na cestě mezi klávesnicí a databází
          došlo k nějaké chybě. Zkuste svůj požadavek zachvíli zopakovat a když se
          chyba bude opakovat, tak nám napište.
        </p>
        <h2>Co se pokazilo</h2>
        <p>Neznámá chyba: foo</p>
      </Container>
    );
  });

  it('renders a problem warning with failed to fetch message', () => {
    expect(shallow(
      <AppErrors
        errors={['Failed to fetch']}
      />
    ).node).to.eql(
      <Container>
        <h1>Jejda, něco se pokazilo</h1>
        <p>
          Stránku se nepovedlo vykreslit, protože na cestě mezi klávesnicí a databází
          došlo k nějaké chybě. Zkuste svůj požadavek zachvíli zopakovat a když se
          chyba bude opakovat, tak nám napište.
        </p>
        <h2>Co se pokazilo</h2>
        <p>Chyba připojení k API. Zkontrolujte vaše připojení k internetu.</p>
      </Container>
    );
  });

  it('renders a problem warning with failed to fetch message', () => {
    expect(shallow(
      <AppErrors
        errors={['Could not connect']}
      />
    ).node).to.eql(
      <Container>
        <h1>Jejda, něco se pokazilo</h1>
        <p>
          Stránku se nepovedlo vykreslit, protože na cestě mezi klávesnicí a databází
          došlo k nějaké chybě. Zkuste svůj požadavek zachvíli zopakovat a když se
          chyba bude opakovat, tak nám napište.
        </p>
        <h2>Co se pokazilo</h2>
        <p>Chyba připojení k API. Zkontrolujte vaše připojení k internetu.</p>
      </Container>
    );
  });
});
