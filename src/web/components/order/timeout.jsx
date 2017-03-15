import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import React, { PropTypes } from 'react';
import Tooltip from 'react-bootstrap/lib/Tooltip';

import Countdown from '../countdown';

const Timeout = ({ endsAt }) => (
  <OverlayTrigger
    placement="bottom"
    overlay={
      <Tooltip id="reservation-trigger-tooltip">
        Pokud vám vyprší rezervace na workshop dřív než přijde platba, tak
        vaše místo nabídneme někomu dalšímu.
      </Tooltip>
    }
  >
    <Countdown countdownMessage="Vyprší za" date={endsAt} />
  </OverlayTrigger>
);

Timeout.propTypes = {
  endsAt: PropTypes.string.isRequired,
};

export default Timeout;
