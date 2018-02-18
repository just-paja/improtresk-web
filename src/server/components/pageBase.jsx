import PropTypes from 'prop-types';
import React from 'react';

const pageBase = ({
  css,
  js,
  markup,
  helmet,
  state,
  lang,
}) => {
  const htmlProps = helmet.htmlAttributes.toComponent();
  return (
    <html lang={lang} {...htmlProps}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        {helmet.title.toComponent()}
        {helmet.base.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
        {css.map(asset =>
          <link key={asset} type="text/css" rel="stylesheet" href={asset} />
        )}
        {/* eslint-disable react/no-danger */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.INITIAL_STATE = ${JSON.stringify(state)};`,
          }}
        />
      </head>
      <body>
        {/* eslint-disable react/no-danger */}
        <div id="appContent" dangerouslySetInnerHTML={{ __html: markup }} />
        {/* eslint-enable react/no-danger */}
        {js.map(asset => <script src={asset} key={asset} />)}
      </body>
    </html>
  );
};

pageBase.propTypes = {
  css: PropTypes.arrayOf(PropTypes.string),
  js: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string.isRequired,
  markup: PropTypes.string,
  state: PropTypes.object,
  helmet: PropTypes.shape({
    base: PropTypes.object,
    meta: PropTypes.object,
    link: PropTypes.object,
    script: PropTypes.object,
    title: PropTypes.object,
  }).isRequired,
};

pageBase.defaultProps = {
  css: [],
  js: [],
  markup: null,
  state: {},
};

export default pageBase;
