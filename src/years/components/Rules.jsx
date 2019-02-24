import Markdown from 'react-markdown'
import React from 'react'
import PropTypes from 'prop-types'

import Message from '../../containers/Message'

const Rules = ({ rules }) => (
  <div>
    {(rules
      ? <Markdown source={rules.text} />
      : <p>
        <Message name='years.conditionsNotPublished' />
      </p>
    )}
  </div>
)

Rules.propTypes = {
  rules: PropTypes.object
}

Rules.defaultProps = {
  rules: null
}

export default Rules
