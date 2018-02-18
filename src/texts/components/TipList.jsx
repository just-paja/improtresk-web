import PropTypes from 'prop-types';
import React from 'react';

import ObjectList from '../../components/ObjectList';
import Tip from './Tip';

const TipList = ({ tips }) => (
  <ObjectList
    Component={Tip}
    data={tips}
  />
);

TipList.propTypes = {
  tips: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TipList;
