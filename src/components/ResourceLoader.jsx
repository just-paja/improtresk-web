import React from 'react'

import styles from './ResourceLoader.css'

const ResourceLoader = () => (
  <div className={styles.container}>
    <div className={styles.spinner}>
      Loading...
    </div>
  </div>
)

export default ResourceLoader
