import Grid from 'react-bootstrap/lib/Grid';
import React, { Component, PropTypes } from 'react';

import Signup from '../signup';

export default class SignupPage extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { onChange, onSubmit, ready, signup } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <Grid>
        <h1>Přihláška</h1>
        <p>
          Napřed tě musíme dostat do systému. Je to jen pár jednoduchých otázek na
          které potřebujeme znát odpověď. Určitě by to nemělo zabrat víc jak dvě
          minuty. <b>V druhém kroce</b> si můžeš poskládat Improtřesk tak jak ti
          bude vyhovovat, tedy vybrat workshop, jídlo a ubytování.
        </p>
        <Signup
          form="signup"
          onChange={onChange}
          onSubmit={onSubmit}
          {...signup}
        />
      </Grid>
    );
  }
}

SignupPage.propTypes = {
  onMount: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  signup: PropTypes.object,
};

SignupPage.defaultProps = {
  ready: false,
};
