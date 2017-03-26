import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import React from 'react';
import Tooltip from 'react-bootstrap/lib/Tooltip';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Countdown from '../../../../src/web/components/countdown';
import OrderTimeout from '../../../../src/web/components/order/timeout';

describe('OrderTimeout component', () => {
  it('renders default message', () => {
    expect(shallow(
      <OrderTimeout endsAt="2017-01-01T01:01:01Z" />
    ).node).to.eql(
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="reservation-trigger-tooltip">
            Pokud vám vyprší rezervace na workshop dřív než přijde platba, tak
            vaše místo nabídneme někomu dalšímu.
          </Tooltip>
        }
      >
        <Countdown countdownMessage="Vyprší za" date="2017-01-01T01:01:01Z" />
      </OverlayTrigger>
    );
  });
});
