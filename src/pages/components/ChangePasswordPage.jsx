import Col from 'reactstrap/lib/Col';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'reactstrap/lib/Row';

import Container from '../../components/Container';
import Message from '../../containers/Message';
import ChangePassword from '../../participants/containers/ChangePassword';

const ChangePasswordPage = ({ translate }) => (
  <Container>
    <Helmet>
      <title>{translate('pages.changePassword')}</title>
    </Helmet>
    <Row>
      <Col md={{ size: 6, offset: 3 }}>
        <h1><Message name="participants.changePassword" /></h1>
        <p>
          <Message name="participants.changePasswordHelp" />
        </p>
        <ChangePassword />
      </Col>
    </Row>
  </Container>
);

ChangePasswordPage.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default ChangePasswordPage;
