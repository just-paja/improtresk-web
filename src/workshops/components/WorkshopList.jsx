import Alert from 'reactstrap/lib/Alert';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import ListGroupItemHeading from 'reactstrap/lib/ListGroupItemHeading';
import PropTypes from 'prop-types';
import React from 'react';

import Capacity from '../../components/Capacity';
import Flex from '../../components/Flex';
import FlexLabel from '../../components/FlexLabel';
import Message from '../../containers/Message';
import PermaLinkContainer from '../../components/PermaLinkContainer';

const WorkshopList = ({ workshops }) => (
  workshops.length > 0 ? (
    <ListGroup>
      {workshops.map(workshop => (
        <PermaLinkContainer
          key={workshop.id}
          to="workshopDetail"
          id={workshop.id}
          title={workshop.name}
        >
          <ListGroupItem tag="a" md={6}>
            <ListGroupItemHeading>
              {workshop.name}
            </ListGroupItemHeading>
            <Flex minSize="md" justify="between">
              <FlexLabel>
                <span>{workshop.difficulty}</span>
                <span>
                  {workshop.lectors.map(lectorRole => lectorRole.lector.name).join(', ')}
                </span>
              </FlexLabel>
              <Capacity {...workshop.capacityStatus} />
            </Flex>
          </ListGroupItem>
        </PermaLinkContainer>
      ))}
    </ListGroup>
  ) : (
    <Alert color="info">
      <Message name="workshops.empty" />
    </Alert>
  )
);

WorkshopList.propTypes = {
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WorkshopList;
