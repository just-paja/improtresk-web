import React from 'react';

import Flex from './Flex';

import { Children } from '../proptypes';

import styles from './FlexLabel.css';

const FlexLabel = ({ children }) => (
  <Flex>
    {React.Children.map(children, child => (
      <div className={styles.column}>{child}</div>
    ))}
  </Flex>
);

FlexLabel.propTypes = {
  children: Children.isRequired,
};

export default FlexLabel;
