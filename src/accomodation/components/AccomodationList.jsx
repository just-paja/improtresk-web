import React from 'react'
import PropTypes from 'prop-types'

import { Accomodation } from '../../proptypes'

import AccomodationDetails from '../../accomodation/components/AccomodationDetails'
import ObjectList from '../../components/ObjectList'

const AccomodationList = ({ accomodationList }) => (
  <ObjectList
    Component={AccomodationDetails}
    data={accomodationList}
  />
)

AccomodationList.propTypes = {
  accomodationList: PropTypes.arrayOf(Accomodation).isRequired
}

export default AccomodationList
