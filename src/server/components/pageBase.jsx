import React, { PropTypes } from 'react';

const pageBase = ({ css, js, markup, state = {} }) => (
  <html lang="cs">
    <head>
      <meta charSet="utf-8" />
      <meta content="width=device-width" name="viewport" />
      <title>Improtřesk</title>
      <link
        type="text/css"
        rel="stylesheet"
        href="/static/bootswatch/sandstone/bootstrap.min.css"
      />
      <link
        type="text/css"
        rel="stylesheet"
        href="/static/font-awesome/css/font-awesome.min.css"
      />
      {css.map((asset, key) =>
        <link key={key} type="text/css" rel="stylesheet" href={`/assets/${asset}`} />
      )}
      {/* eslint-disable react/no-danger */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.INITIAL_STATE = ${JSON.stringify(state)};`,
        }}
      />
      {/* eslint-enable react/no-danger */}
    </head>
    <body>
      {/* eslint-disable react/no-danger */}
      <div
        id="appContent"
        dangerouslySetInnerHTML={{
          __html: markup,
        }}
      />
      {/* eslint-enable react/no-danger */}
      {js.map((asset, key) => <script src={`/assets/${asset}`} key={key} />)}
    </body>
  </html>
);

pageBase.propTypes = {
  css: PropTypes.object,
  js: PropTypes.object,
  markup: PropTypes.string,
  state: PropTypes.object,
};

pageBase.defaultProps = {
  css: [],
  js: [],
};

export default pageBase;
