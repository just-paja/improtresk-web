import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';

import Container from '../container';
import Link from '../link';

export default class Conditions extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { conditions, ready } = this.props;
    const title = 'Podmínky pro účastníky';

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
        {(conditions ?
          <Markdown source={conditions.text} /> :
          <p>
            Podmínky pro účastníky za tento ročník ještě nejsou zveřejněné. Organizátoři
            by to měli co nejrychleji napravit, zkuste je{' '}
            <Link to="contact">popohnat</Link>.
          </p>
        )}
      </Container>
    );
  }
}

Conditions.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  conditions: PropTypes.object,
};

Conditions.defaultProps = {
  conditions: null,
  ready: false,
};
