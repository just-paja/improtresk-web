import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import React, { Component, PropTypes } from 'react';

import WorkshopSummaryOneLine from './workshopSummaryOneLine';

import styles from './workshopPickerItem.css';

export default class WorkshopPickerItem extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { id, onChange, selected } = this.props;
    onChange(selected ? null : id);
  }

  render() {
    const { capacity, lectors, name, selected } = this.props;
    return (
      <a
        className={classnames(
          styles.box,
          selected ? styles.selected : styles.unselected
        )}
        tabIndex={0}
        onClick={this.handleChange}
      >
        <span className={styles.input}>
          <FontAwesome name={selected ? 'check-square-o' : 'square-o'} />
        </span>
        <div className={styles.workshop}>
          <WorkshopSummaryOneLine
            name={name}
            lectors={lectors}
            capacity={capacity}
          />
        </div>
      </a>
    );
  }
}

WorkshopPickerItem.propTypes = {
  id: PropTypes.number.isRequired,
  capacity: PropTypes.number,
  lectors: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

WorkshopPickerItem.defaultProps = {
  capacity: false,
  selected: false,
};
