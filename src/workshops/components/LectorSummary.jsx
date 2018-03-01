import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import Markdown from 'react-markdown';

import Gallery from '../../components/Gallery';

const LectorSummary = ({ name, position, about, photos }) => (
  <Card>
    <Helmet
      meta={[
        ...photos.reduce((data, photo) => ([
          ...data,
          {
            property: 'og:image',
            content: photo.image,
          },
          {
            property: 'og:image:height',
            content: photo.height,
          },
          {
            property: 'og:image:width',
            content: photo.width,
          },
        ]), []),
      ]}
    />

    <CardBody>
      <CardTitle tag="h3">
        {name}
      </CardTitle>
      <p><strong>{position}</strong></p>
      <Markdown source={about} />
      <Gallery photos={photos} />
    </CardBody>
  </Card>
);

LectorSummary.propTypes = {
  about: PropTypes.string,
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  photos: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
  })).isRequired,
};

LectorSummary.defaultProps = {
  about: null,
  position: null,
};

export default LectorSummary;
