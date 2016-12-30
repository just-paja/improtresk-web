import Grid from 'react-bootstrap/lib/Grid';
import React, { PropTypes } from 'react';

import Partner from './partner';

import styles from './footer.css';

const Footer = ({ currentYear, partners }) => (
  <footer className={styles.footer}>
    <Grid>
      {partners.map(partner => <Partner {...partner} />)}
      <p className="text-center">
        &copy; Česká improvizační liga {currentYear ? currentYear.year : null}
      </p>
    </Grid>
  </footer>
);

Footer.propTypes = {
  currentYear: PropTypes.object,
  partners: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Footer;
