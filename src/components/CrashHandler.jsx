import React, { Component } from 'react';

import { Children } from '../proptypes';

import { logError } from '../clientLogger';

export default class CrashHandler extends Component {
  constructor() {
    super();
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
    logError(error);
  }

  render() {
    if (this.state.error) {
      return <div>Holly shit, something went wrong!</div>;
    }

    return <div>{this.props.children}</div>;
  }
}

CrashHandler.propTypes = {
  children: Children,
};

CrashHandler.defaultProps = {
  children: null,
};
