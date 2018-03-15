import React from 'react';
import PropTypes from 'prop-types';

import Message from '../../containers/Message';
import ObjectList from '../../components/ObjectList';
import PerformerListItem from '../../performers/components/PerformerListItem';

const PerformerList = ({
  performerList,
}) => (
  <ObjectList
    Component={PerformerListItem}
    emptyMessage={<Message name="schedule.performersNotReady" />}
    data={performerList}
    colProps={{
      sm: 6,
      md: 4,
    }}
  />
);

PerformerList.propTypes = {
  performerList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PerformerList;
