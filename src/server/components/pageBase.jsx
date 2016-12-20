import React, { PropTypes } from 'react';

const pageBase = ({ markup }) => (
  <html lang="cs">
    <head>
      <meta charSet="utf-8" />
      <meta content="width=device-width" name="viewport" />
      <title>Improtřesk</title>
      <script src="/assets/app.js" />
      <link
        type="text/css"
        rel="stylesheet"
        href="/static/bootswatch/bootstrap.min.css"
      />
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
    </body>
  </html>
);

pageBase.propTypes = {
  markup: PropTypes.string,
};

export default pageBase;
