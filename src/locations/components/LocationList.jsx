import React from 'react'
import PropTypes from 'prop-types'

import LocationItem from './LocationItem'
import ObjectList from '../../components/ObjectList'

const LocationList = ({ locationList }) => (
  <ObjectList
    Component={LocationItem}
    data={locationList}
  />
)

LocationList.propTypes = {
  locationList: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default LocationList
