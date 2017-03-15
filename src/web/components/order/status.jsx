import Label from 'react-bootstrap/lib/Label';
import React, { PropTypes } from 'react';

import Timeout from './timeout';

const Header = ({
  canceled,
  confirmed,
  assigned,
  endsAt,
  paid,
}) => {
  if (canceled) {
    return <Label bsStyle="danger">Zrušeno uživatelem</Label>;
  }

  if (assigned) {
    return <Label bsStyle="success">Zařazeno na workshop</Label>;
  }

  if (confirmed) {
    return (
      <span>
        <Label bsStyle="primary">Potvrzeno uživatelem</Label>
        {!assigned && !paid ? (
          <span>
            {' '}
            <Timeout endsAt={endsAt} />
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <span>
      <Label bsStyle="warning">Nepotvrzeno</Label>
      {' '}
      <Timeout endsAt={endsAt} />
    </span>
  );
};

Header.propTypes = {
  assigned: PropTypes.bool,
  canceled: PropTypes.bool,
  confirmed: PropTypes.bool,
  paid: PropTypes.bool,
  endsAt: PropTypes.string.isRequired,
};

Header.defaultProps = {
  assigned: false,
  canceled: false,
  confirmed: false,
  endsAt: null,
  paid: false,
};

export default Header;
