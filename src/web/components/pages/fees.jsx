import Markdown from 'react-markdown';
import React, { Component, PropTypes } from 'react';

export default class Fees extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { howToPay, howToSignOut, ready, whatDoYouPayFor } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <div>
        <h1>Poplatky</h1>
        <h2>Za co se platí?</h2>
        <Markdown source={whatDoYouPayFor} />

        <h2>Jak zaplatím?</h2>
        <Markdown source={howToPay} />

        <h2>Jak se můžu odhlásit?</h2>
        <Markdown source={howToSignOut} />
      </div>
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
