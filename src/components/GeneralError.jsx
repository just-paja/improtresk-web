import React from 'react';

import Container from './Container';

const GeneralError = () => (
  <Container>
    <h1>Jejda, něco se pokazilo</h1>
    <p>
      Během vašeho požadavku se něco pokazilo a nebyli jsme schopni to vyřídit.
      Zkuste to prosím znovu, potom zkuste chvílil počkat a zkusit to znovu a když
      to nepomůže, tak nám napište.
    </p>
  </Container>
);

export default GeneralError;
