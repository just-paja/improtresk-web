import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'

import { Children } from '../proptypes'

import Flex from './Flex'

const Prop = ({ children, icon, label }) => (
  children ? (
    <li>
      <Flex>
        <span className='mr-1'>
          {icon ? <FontAwesome className='fa-fw' name={icon} /> : null}
          {icon ? ' ' : null}
          {label ? <b>{label}:</b> : null}
          {label ? ' ' : null}
        </span>
        {children}
      </Flex>
    </li>
  ) : null
)

Prop.propTypes = {
  children: Children,
  icon: PropTypes.string,
  label: PropTypes.node
}

Prop.defaultProps = {
  children: null,
  icon: null,
  label: null
}

export default Prop
