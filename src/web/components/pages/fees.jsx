import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';

import Container from '../container';

export default class Fees extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { howToPay, howToSignOut, ready, whatDoYouPayFor } = this.props;
    const title = 'Poplatky';

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
        <h2>Za co se platí?</h2>
        <Markdown source={whatDoYouPayFor} />

        <h2>Jak zaplatím?</h2>
        <Markdown source={howToPay} />

        <h2>Jak se můžu odhlásit?</h2>
        <Markdown source={howToSignOut} />
      </Container>
    );
  }
}

Fees.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  whatDoYouPayFor: PropTypes.string.isRequired,
  howToPay: PropTypes.string.isRequired,
  howToSignOut: PropTypes.string.isRequired,
};

Fees.defaultProps = {
  ready: false,
};
