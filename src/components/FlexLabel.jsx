import React from 'react';

import Flex from './Flex';

import { Children } from '../proptypes';

import styles from './FlexLabel.css';

const FlexLabel = ({ children, ...other }) => (
  <Flex {...other}>
    {React.Children.map(children, child => (child ? (
      <div className={styles.column}>{child}</div>
    ) : null))}
  </Flex>
);

FlexLabel.propTypes = {
  children: Children.isRequired,
};

export default FlexLabel;
