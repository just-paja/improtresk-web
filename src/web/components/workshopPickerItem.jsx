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
    const {
      assigned,
      capacity,
      freeSpots,
      lectors,
      name,
      reserved,
      selected,
    } = this.props;
    return (
      <a
        className={classnames(
          styles.box,
          selected ? styles.selected : styles.unselected
        )}
        tabIndex={0}
        onClick={this.handleChange}
      >
        <WorkshopSummaryOneLine
          assigned={assigned}
          capacity={capacity}
          freeSpots={freeSpots}
          name={name}
          lectors={lectors}
          reserved={reserved}
        />
        {selected ? (
          <span className={styles.check}>
            <FontAwesome name="check-circle" />
          </span>
        ) : null}
      </a>
    );
  }
}

WorkshopPickerItem.propTypes = {
  assigned: PropTypes.number,
  capacity: PropTypes.number,
  id: PropTypes.number.isRequired,
  freeSpots: PropTypes.number,
  lectors: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  reserved: PropTypes.number,
  selected: PropTypes.bool,
};

WorkshopPickerItem.defaultProps = {
  assigned: null,
  capacity: null,
  freeSpots: null,
  reserved: null,
  selected: false,
};
