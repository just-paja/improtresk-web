import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import ChangeFood from '../../participants/components/ChangeFood';

export default class ChangeFoodPage extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const {
      changeFood,
      onChangeFoodChange,
      onChangeFoodSubmit,
      meals,
      ready,
    } = this.props;

    if (!ready) {
      return null;
    }

    return (
      <Container>
        <h1>Výběr jídla</h1>
        <ChangeFood
          form="changeFood"
          onChange={onChangeFoodChange}
          onSubmit={onChangeFoodSubmit}
          meals={meals}
          {...changeFood}
        />
      </Container>
    );
  }
}

ChangeFoodPage.propTypes = {
  changeFood: PropTypes.object.isRequired,
  onChangeFoodChange: PropTypes.func.isRequired,
  onChangeFoodSubmit: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  ready: PropTypes.bool,
};

ChangeFoodPage.defaultProps = {
  ready: false,
};