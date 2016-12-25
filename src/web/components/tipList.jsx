import React, { PropTypes } from 'react';

import ObjectList from './objectList';
import Tip from './tip';

const TipList = ({ tips }) => (
  <ObjectList
    component={Tip}
    data={tips}
  />
);

TipList.propTypes = {
  tips: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TipList;
