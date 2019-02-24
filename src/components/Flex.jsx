import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import { Children, ClassName } from '../proptypes'

import styles from './Flex.css'

const Flex = ({
  alignItems,
  children,
  className,
  direction,
  inline,
  justify,
  minSize,
  textAlign,
  width
}) => (
  <div
    className={classnames(styles.component, {
      [`d-${inline ? 'inline-flex' : 'flex'}`]: !minSize,
      [`d-${minSize}-${inline ? 'inline-flex' : 'flex'}`]: !!minSize,
      [`align-items-${alignItems}`]: !!alignItems,
      [`w-${width}`]: !!width,
      [`justify-content-${justify}`]: !!justify,
      [`flex-${direction}`]: !!direction,
      [`text-align-${textAlign}`]: !!textAlign,
      [className]: className
    })}
  >
    {children}
  </div>
)

Flex.propTypes = {
  alignItems: PropTypes.oneOf(['start', 'end', 'center', 'baseline']),
  className: ClassName,
  direction: PropTypes.oneOf(['column', 'column-reverse', 'row', 'row-reverse']),
  children: Children.isRequired,
  inline: PropTypes.bool,
  justify: PropTypes.oneOf(['between']),
  minSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  width: PropTypes.oneOf([25, 50, 75, 100])
}

Flex.defaultProps = {
  alignItems: null,
  className: null,
  direction: null,
  inline: false,
  justify: null,
  minSize: null,
  textAlign: null,
  width: null
}

export default Flex
