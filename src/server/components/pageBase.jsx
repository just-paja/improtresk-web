import React, { PropTypes } from 'react';

const pageBase = ({ markup }) => (
  <html lang="cs">
    <head>
      <meta charSet="utf-8" />
      <meta content="width=device-width" name="viewport" />
      <title>Improtřesk</title>
      <link
        type="text/css"
        rel="stylesheet"
        href="/static/bootswatch/bootstrap.min.css"
      />
      <link
        type="text/css"
        rel="stylesheet"
        href="/static/font-awesome/css/font-awesome.min.css"
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
      <script src="/assets/app.js" />
    </body>
  </html>
);

pageBase.propTypes = {
  markup: PropTypes.string,
};

export default pageBase;
