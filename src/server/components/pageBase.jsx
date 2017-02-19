import React, { PropTypes } from 'react';

const pageBase = ({
  css,
  js,
  markup,
  helmet: { title, base, meta, link, script },
  state = {},
}) => (
  <html lang="cs">
    <head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="utf-8" />
      <meta content="width=device-width,initial-scale=1" name="viewport" />
      {title.toComponent()}
      {base.toComponent()}
      {meta.toComponent()}
      {link.toComponent()}
      {script.toComponent()}
      {css.map(asset =>
        <link key={asset} type="text/css" rel="stylesheet" href={`/assets/${asset}`} />
      )}
      {/* eslint-disable react/no-danger */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.INITIAL_STATE = ${JSON.stringify(state)};`,
        }}
      />
      {/* eslint-enable react/no-danger */}
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyABnfkdNP9H-wCCshO_ZRYxvGoCEozHxzg" />
    </head>
    <body>
      {/* eslint-disable react/no-danger */}
      <div id="appContent" dangerouslySetInnerHTML={{ __html: markup }} />
      {/* eslint-enable react/no-danger */}
      {js.map(asset => <script src={`/assets/${asset}`} key={asset} />)}
    </body>
  </html>
);

pageBase.propTypes = {
  css: PropTypes.object,
  js: PropTypes.object,
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
  state: undefined,
};

export default pageBase;
