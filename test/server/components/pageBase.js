import Helmet from 'react-helmet';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import PageBase from '../../../src/server/components/pageBase';

describe('PageBase component', () => {
  it('renders', () => {
    expect(shallow(
      <PageBase
        css={['test.css']}
        js={['test.js']}
        markup="foo"
        state={{
          testState: 'foo',
        }}
        helmet={Helmet.rewind()}
      />
    ).node).to.eql(
      <html lang="cs">
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta content="width=device-width,initial-scale=1" name="viewport" />
          <title data-react-helmet />
          <link key="test.css" type="text/css" rel="stylesheet" href="/assets/test.css" />
          {/* eslint-disable react/no-danger */}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.INITIAL_STATE = ${JSON.stringify({
                testState: 'foo',
              })};`,
            }}
          />
          {/* eslint-enable react/no-danger */}
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyABnfkdNP9H-wCCshO_ZRYxvGoCEozHxzg" />
        </head>
        <body>
          {/* eslint-disable react/no-danger */}
          <div id="appContent" dangerouslySetInnerHTML={{ __html: 'foo' }} />
          {/* eslint-enable react/no-danger */}
          <script src="/assets/test.js" />
        </body>
      </html>
    );
  });
});
