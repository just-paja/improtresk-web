import React, { PropTypes } from 'react';

import Container from './container';

const mapErrorMessage = (message) => {
  if (message === 'Failed to fetch' || message.indexOf('connect') > -1) {
    return 'Chyba připojení k API. Zkontrolujte vaše připojení k internetu.';
  }

  return `Neznámá chyba: ${message}`;
};

const AppErrors = ({ errors }) => (
  <Container>
    <h1>Jejda, něco se pokazilo</h1>
    <p>
      Stránku se nepovedlo vykreslit, protože na cestě mezi klávesnicí a databází
      došlo k nějaké chybě. Zkuste svůj požadavek zachvíli zopakovat a když se
      chyba bude opakovat, tak nám napište.
    </p>
    <h2>Co se pokazilo</h2>
    {errors
      .map(mapErrorMessage)
      .sort()
      .filter((message, index, self) => self.indexOf(message) === index)
      .map(error => <p key={error}>{error}</p>)
    }
  </Container>
);

AppErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AppErrors;
