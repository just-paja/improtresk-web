import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Col from 'reactstrap/lib/Col';
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import { Workshop } from '../../proptypes';

import Capacity from '../../components/Capacity';
import Gallery from '../../components/Gallery';
import HelmetTitle from '../../containers/HelmetTitle';
import LectorSummary from './LectorSummary';
import Link from '../../containers/Link';
import Message from '../../containers/Message';
import PriceList from '../../years/components/PriceList';
import Prop from '../../components/Prop';

const WorkshopDetail = ({ workshop }) => (
  <div>
    <HelmetTitle title={workshop.name} />
    <Helmet
      meta={[
        {
          property: 'og:description',
          content: `${workshop.desc.substr(0, 127)}...`,
        },
      ]}
    />
    <h1 className="decent">{workshop.name}</h1>
    <Row>
      <Col className="mb-4 col-wrap" xs="12" lg="6">
        <Card>
          <CardBody>
            <ul className="list-unstyled">
              <Prop icon="hand-rock-o" label={<Message name="workshops.difficulty" />}>
                {workshop.difficulty}
              </Prop>
              <Prop icon="money" label={<Message name="workshops.price" />}>
                {workshop.prices.length ? <PriceList prices={workshop.prices} /> : null}
              </Prop>
              <Prop icon="users" label={<Message name="workshops.capacity" />}>
                <Capacity {...workshop.capacityStatus} />
              </Prop>
            </ul>
            <div>
              <Markdown source={workshop.desc} />
            </div>
            <Gallery photos={workshop.photos} />
          </CardBody>
        </Card>
      </Col>
      <Col className="mb-4" xs="12" lg="6">
        {workshop.lectors.map(lectorPosition => (
          <div className="mb-4" key={lectorPosition.id}>
            <LectorSummary
              name={lectorPosition.lector.name}
              about={lectorPosition.lector.about}
              photos={lectorPosition.lector.photos}
              position={lectorPosition.role}
            />
          </div>
        ))}
      </Col>
    </Row>
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to="workshops">
          <Message name="pages.workshops" />
        </Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>
        {workshop.name}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
);

WorkshopDetail.propTypes = {
  workshop: Workshop.isRequired,
};

export default WorkshopDetail;
