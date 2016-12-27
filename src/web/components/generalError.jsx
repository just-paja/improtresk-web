import Grid from 'react-bootstrap/lib/Grid';
import React from 'react';

const GeneralError = () => (
  <Grid>
    <h1>Jejda, něco se pokazilo</h1>
    <p>
      Během vašeho požadavku se něco pokazilo a nebyli jsme schopni to vyřídit.
      Zkuste to prosím znovu, potom zkuste chvílil počkat a zkusit to znovu a když
      to nepomůže, tak nám napište.
    </p>
  </Grid>
);

export default GeneralError;
