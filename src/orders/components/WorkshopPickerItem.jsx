import FontAwesome from 'react-fontawesome';
import React, { Component } from 'react';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import ListGroupItemHeading from 'reactstrap/lib/ListGroupItemHeading';
import PropTypes from 'prop-types';

import Capacity from '../../components/Capacity';
import Flex from '../../components/Flex';
import ProgressBar from '../../components/ProgressBar';

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
      <ListGroupItem
        active={!disabled && selected}
        disabled={disabled}
        tabIndex={0}
        onClick={this.handleChange}
      >
        <ListGroupItemHeading className={styles.heading}>
          <Flex alignItems="center">
            {freeSpots > 0 || selected ? (
              <FontAwesome className="fa-fw" name={selected ? 'check-square' : 'square-o'} />
            ) : null}
            {!selected && !freeSpots ? (
              <FontAwesome className="fa-fw" name="minus-circle" />
            ) : null}
            <span>{name}</span>
          </Flex>
        </ListGroupItemHeading>
        <Flex justify="between" minSize="md">
          <div>
            {lectors ? (
              lectors
                .map(lectorPosition => lectorPosition.lector.name)
                .join(', ')
            ) : null}
          </div>
          <Capacity
            assigned={assigned}
            capacity={capacity}
            freeSpots={freeSpots}
            reserved={reserved}
          />
        </Flex>
        <div>
          <ProgressBar
            local
            max={capacity}
            min={0}
            value={assigned + reserved}
          />
        </div>
      </ListGroupItem>
    );
  }
}

WorkshopPickerItem.propTypes = {
  assigned: PropTypes.number,
  capacity: PropTypes.number,
  disabled: PropTypes.bool,
  id: PropTypes.number,
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
  id: null,
  reserved: null,
  selected: false,
};
