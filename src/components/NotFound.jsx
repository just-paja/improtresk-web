import React from 'react'

import Message from '../containers/Message'

const NotFound = () => (
  <div>
    <h3><Message name='general.objectNotFound' /></h3>
    <p><Message name='general.objectNotFoundHelp' /></p>
  </div>
)

export default NotFound
