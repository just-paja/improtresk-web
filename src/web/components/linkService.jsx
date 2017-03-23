import FontAwesome from 'react-fontawesome';
import React, { PropTypes } from 'react';

const openLink = (e) => {
  e.preventDefault();
  window.open(e.target.href);
};

const serviceIcons = {
  bandzone: 'play-circle',
  facebook: 'facebook-square',
  soundcloud: 'play-circle',
  youtube: 'play-circle',
};

const getServiceIcon = (icon) => {
  if (!icon || !serviceIcons[icon]) {
    return 'external-link-square';
  }
  return serviceIcons[icon];
};

const LinkService = ({ children, href, service }) => (
  <a href={href} onClick={openLink}>
    <FontAwesome name={getServiceIcon(service)} />
    {' '}
    {children}
  </a>
);

LinkService.propTypes = {
  href: PropTypes.string.isRequired,
  service: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

LinkService.defaultProps = {
  service: null,
};

export default LinkService;
