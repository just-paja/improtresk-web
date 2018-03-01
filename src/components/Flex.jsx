import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import { Children, ClassName } from '../proptypes';

import styles from './Flex.css';

const Flex = ({ alignItems, children, className, minSize, justify, width }) => (
  <div
    className={classnames(styles.component, {
      'd-flex': !minSize,
      [`d-${minSize}-flex`]: !!minSize,
      [`align-items-${alignItems}`]: !!alignItems,
      [`w-${width}`]: !!width,
      [`justify-content-${justify}`]: !!justify,
      [className]: className,
    })}
  >
    {children}
  </div>
);

Flex.propTypes = {
  alignItems: PropTypes.oneOf(['start', 'end', 'center', 'baseline']),
  className: ClassName,
  children: Children.isRequired,
  justify: PropTypes.oneOf(['between']),
  minSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  width: PropTypes.oneOf([25, 50, 75, 100]),
};

Flex.defaultProps = {
  alignItems: null,
  className: null,
  justify: null,
  minSize: null,
  width: null,
};

export default Flex;
