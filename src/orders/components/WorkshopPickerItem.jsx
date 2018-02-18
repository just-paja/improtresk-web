import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';
import WorkshopSummaryOneLine from '../../workshops/components/WorkshopSummaryOneLine';

import styles from './WorkshopPickerItem.css';

export default class WorkshopPickerItem extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { id, disabled, onChange, selected } = this.props;
    if (!disabled) {
      onChange(selected ? null : id);
    }
  }

  render() {
    const {
      assigned,
      capacity,
      disabled,
      freeSpots,
      lectors,
      name,
      reserved,
      selected,
    } = this.props;
    return (
      <Button
        className={classnames(
          styles.box,
          {
            [styles.selected]: !disabled && selected,
            [styles.unselected]: disabled || !selected,
            [styles.disabled]: disabled,
          }
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
        <div className={styles.progress}>
          <ProgressBar
            local
            max={capacity}
            min={0}
            now={assigned + reserved}
          />
        </div>
        {selected ? (
          <span className={styles.check}>
            <FontAwesome className="fa-fw" name="check-circle" />
          </span>
        ) : null}
        {!selected && freeSpots === 0 ? (
          <span className={classnames(styles.check, styles.full)}>
            <FontAwesome className="fa-fw" name="minus-circle" />
          </span>
        ) : null}
      </Button>
    );
  }
}

WorkshopPickerItem.propTypes = {
  assigned: PropTypes.number,
  capacity: PropTypes.number,
  disabled: PropTypes.bool,
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
  disabled: false,
  freeSpots: null,
  reserved: null,
  selected: false,
};
