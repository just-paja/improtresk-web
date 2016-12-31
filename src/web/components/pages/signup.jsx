import Helmet from 'react-helmet';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import Signup from '../signup';

export default class SignupPage extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { onChange, onSubmit, ready, signup } = this.props;
    const title = 'Přihláška';

    if (!ready) {
      return null;
    }

    return (
      <Container>
        <Helmet
          title={title}
          meta={[
            { property: 'og:title', content: title },
          ]}
        />
        <h1>{title}</h1>
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
      </Container>
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
