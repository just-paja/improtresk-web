import Alert from 'reactstrap/lib/Alert'
import ListGroup from 'reactstrap/lib/ListGroup'
import PropTypes from 'prop-types'
import React from 'react'

import Message from '../../containers/Message'
import WorkshopListItem from './WorkshopListItem'

const WorkshopList = ({ workshops }) => (
  workshops.length > 0 ? (
    <ListGroup>
      {workshops.map(workshop => (
        <WorkshopListItem
          key={workshop.id}
          workshop={workshop}
        />
      ))}
    </ListGroup>
  ) : (
    <Alert color='info'>
      <Message name='workshops.empty' />
    </Alert>
  )
)

WorkshopList.propTypes = {
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default WorkshopList
