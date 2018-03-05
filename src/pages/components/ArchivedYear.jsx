import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import Gallery from '../../components/Gallery';

const ArchivedYear = ({ topic, workshops, year }) => {
  const title = `Ročník ${year}`;
  const titleFull = `${title}: ${topic}`;

  return (
    <Container>
      <Helmet
        title={titleFull}
        meta={[
          { property: 'og:title', content: titleFull },
        ]}
      />
      <h1><span>{title}</span><br /><small>{topic}</small></h1>
      <Row>
        {workshops.map(workshop => (
          <Col key={workshop.id} className="mb-4" xs={12} md={6}>
            <Card>
              <CardBody>
                <CardTitle>{workshop.name}</CardTitle>
                {workshop.desc}
                {workshop.photos.length ? (
                  <div>
                    <hr />
                    <Gallery photos={workshop.photos} />
                  </div>
                ) : null}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

ArchivedYear.propTypes = {
  topic: PropTypes.string,
  workshops: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    lectorName: PropTypes.string,
    name: PropTypes.string,
  })),
  year: PropTypes.string,
};

ArchivedYear.defaultProps = {
  topic: null,
  workshops: null,
  year: null,
};

export default ArchivedYear;
