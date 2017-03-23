import React, { PropTypes } from 'react';

import LinkService from '../linkService';

const allowedServices = [
  'bandzone',
  'soundcloud',
  'youtube',
];

const SurveyPerformer = ({
  links,
}) => (
  <ul className="list-inline">
    {links
      .filter(link => allowedServices.indexOf(link.service) !== -1)
      .map(link => (
        <li key={link.id}>
          <LinkService
            href={link.address}
            service={link.service}
          >{link.name}</LinkService>
        </li>
      ))
    }
  </ul>
);

SurveyPerformer.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SurveyPerformer;
