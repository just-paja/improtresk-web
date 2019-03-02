import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'

import { Year } from '../proptypes'

import HelmetTitle from './HelmetTitle'

export const AppHelmet = ({
  host,
  entryPath,
  translate,
  year
}) => {
  const defaultTitle = translate('pages.defaultTitle')
  return (
    <div>
      <HelmetTitle title={defaultTitle} translate={translate} year={year} />
      <Helmet defaultTitle={defaultTitle}>
        <meta property='og:description' content={translate('pages.about')} />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={`${host}/static/theme/2018/og-share.png`} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:url' content={`${host}${entryPath}`} />
        <meta name='msapplication-config' content='/static/theme/favicon/browserconfig.xml' />
        <meta name='theme-color' content='#fff' />
        <link
          rel='stylesheet'
          type='text/css'
          href='/static/font-awesome/css/font-awesome.min.css'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/static/theme/favicon/apple-icon-180x180.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/static/theme/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/static/theme/favicon/favicon-16x16.png'
        />
        <link
          rel='manifest'
          href='/static/theme/favicon/manifest.json'
        />
        <link
          rel='mask-icon'
          color='#5bbad5'
          href='/static/theme/favicon/safari-pinned-tab.svg'
        />
        <link
          rel='shortcut icon'
          href='/static/theme/favicon/favicon.ico'
        />
      </Helmet>
    </div>
  )
}

AppHelmet.propTypes = {
  host: PropTypes.string.isRequired,
  entryPath: PropTypes.string,
  translate: PropTypes.func.isRequired,
  year: Year
}

AppHelmet.defaultProps = {
  entryPath: null,
  year: null
}
