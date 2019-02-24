import Alert from 'reactstrap/lib/Alert'
import Markdown from 'react-markdown'
import PropTypes from 'prop-types'
import React from 'react'

import { MultiLingualDescription } from '../proptypes'

import Message from '../containers/Message'

const MultiLingualMarkdown = ({
  emptyMessage,
  headingSize: HeadingSize,
  lang,
  skipFirstHeading,
  texts
}) => {
  if (!texts || !texts.length) {
    if (emptyMessage) {
      return (
        <Alert color='info'>
          <Message name={emptyMessage} />
        </Alert>
      )
    }
    return null
  }

  return (
    <div>
      {texts
        .filter(markdown => markdown.lang === lang)
        .map((markdown, index) => (
          <div key={markdown.id}>
            {markdown.name && (!skipFirstHeading || index !== 0) ? (
              <HeadingSize>{markdown.name}</HeadingSize>
            ) : null}
            <Markdown source={markdown.text} />
          </div>
        ))}
    </div>
  )
}

MultiLingualMarkdown.propTypes = {
  emptyMessage: PropTypes.string,
  headingSize: PropTypes.string,
  lang: PropTypes.string.isRequired,
  skipFirstHeading: PropTypes.bool,
  texts: MultiLingualDescription
}

MultiLingualMarkdown.defaultProps = {
  emptyMessage: null,
  headingSize: 'h2',
  skipFirstHeading: false,
  texts: null
}

export default MultiLingualMarkdown
