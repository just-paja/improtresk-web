import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import ListGroupItemHeading from 'reactstrap/lib/ListGroupItemHeading';
import React from 'react';

import { Workshop } from '../../proptypes';

import Capacity from '../../components/Capacity';
import Flex from '../../components/Flex';
import FlexLabel from '../../components/FlexLabel';
import PermaLinkContainer from '../../components/PermaLinkContainer';

const WorkshopListItem = ({ workshop }) => (
  <PermaLinkContainer
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
);

WorkshopListItem.propTypes = {
  workshop: Workshop.isRequired,
};

export default WorkshopListItem;
