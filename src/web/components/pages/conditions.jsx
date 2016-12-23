import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';

import Link from '../link';

export default class Conditions extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { conditions, ready, year } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <div>
        <h1>Podmínky pro účastníky{year ? ` (Improtřesk ${year.year})` : null}</h1>
        {(conditions ?
          <Markdown source={conditions.text} /> :
          <p>
            Podmínky pro účastníky za tento ročník ještě nejsou zveřejněné. Organizátoři
            by to měli co nejrychleji napravit, zkuste je{' '}
            <Link to="contact">popohnat</Link>.
          </p>
        )}
      </div>
    );
  }
}

Conditions.propTypes = {
  onMount: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  conditions: PropTypes.object,
  year: PropTypes.object,
};

Conditions.defaultProps = {
  ready: false,
};
