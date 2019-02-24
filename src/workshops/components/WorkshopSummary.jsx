import PropTypes from 'prop-types'
import React from 'react'

import Capacity from '../../components/Capacity'
import PermaLink from '../../components/PermaLink'
import Prop from '../../components/Prop'
import Message from '../../containers/Message'

const WorkshopSummary = ({ id, capacityStatus, difficulty, name, lectors }) => (
  <div>
    <h3>
      <PermaLink id={id} title={name} to='workshopDetail'>{name}</PermaLink>
    </h3>

    <ul className='list-unstyled'>
      {lectors.map(lectorPosition => (
        <Prop
          key={lectorPosition.id}
          icon='user'
          label={lectorPosition.role}
        >
          {lectorPosition.lector.name}
        </Prop>
      ))}
      <Prop icon='hand-rock-o' label={<Message name='workshops.difficulty' />}>{difficulty}</Prop>
      <Prop icon='balance-scale' label={<Message name='workshops.capacity' />}>
        {capacityStatus ? (
          <Capacity
            freeSpots={capacityStatus.freeSpots}
            fullyAssigned={capacityStatus.fullyAssigned}
            fullyReserved={capacityStatus.fullyReserved}
            reserved={capacityStatus.reserved}
          />
        ) : null}
      </Prop>
    </ul>
    <PermaLink id={id} title={name} to='workshopDetail'>
      <Message name='workshops.moreInfo' />
    </PermaLink>
  </div>
)

WorkshopSummary.propTypes = {
  id: PropTypes.number.isRequired,
  capacityStatus: PropTypes.shape({
    freeSpots: PropTypes.number,
    fullyAssigned: PropTypes.bool,
    fullyReserved: PropTypes.bool,
    reserved: PropTypes.number
  }),
  difficulty: PropTypes.string,
  name: PropTypes.string.isRequired,
  lectors: PropTypes.arrayOf(PropTypes.shape({
    lector: PropTypes.shape({
      name: PropTypes.name
    }),
    role: PropTypes.string
  })).isRequired
}

WorkshopSummary.defaultProps = {
  capacityStatus: null,
  difficulty: null
}

export default WorkshopSummary
