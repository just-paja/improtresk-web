import FormFeedback from 'reactstrap/lib/FormFeedback'
import ListGroup from 'reactstrap/lib/ListGroup'
import React from 'react'
import PropTypes from 'prop-types'

import FormErrors from '../../forms/containers/FormErrors'
import WorkshopPickerItem from './WorkshopPickerItem'

const WorkshopPicker = ({
  allowEmpty,
  input,
  meta,
  workshops
}) => (
  <div>
    <ListGroup>
      {workshops
        .map(workshop => (
          <WorkshopPickerItem
            assigned={workshop.capacityStatus.assigned}
            capacity={workshop.capacityStatus.capacity}
            disabled={
              meta.submitting ||
              workshop.capacityStatus.fullyAssigned ||
              workshop.capacityStatus.fullyReserved
            }
            freeSpots={workshop.capacityStatus.freeSpots}
            id={workshop.id}
            key={workshop.id}
            lectors={workshop.lectors}
            name={workshop.name}
            onChange={input.onChange}
            reserved={workshop.capacityStatus.reserved}
            selected={input.value === workshop.id}
          />
        ))
      }
    </ListGroup>
    <hr />
    {allowEmpty ? (
      <WorkshopPickerItem
        name='Jedu bez workshopu'
        selected={!input.value}
        freeSpots={1000}
        onChange={input.onChange}
        lectors={[]}
        id={null}
      />
    ) : null}
    {meta.touched && meta.error ? (
      <FormFeedback>
        <FormErrors
          errors={meta.error}
          data={{ field: input.name }}
          label='orders.workshop'
        />
      </FormFeedback>
    ) : null}
  </div>
)

WorkshopPicker.propTypes = {
  allowEmpty: PropTypes.bool,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired
}

WorkshopPicker.defaultProps = {
  allowEmpty: false
}

export default WorkshopPicker
