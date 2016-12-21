import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import WorkshopList from '../../../src/web/components/workshopList';
import WorkshopSummary from '../../../src/web/components/workshopSummary';

describe('Workshop List component', () => {
  it('renders', () => {
    expect(shallow(
      <WorkshopList
        workshops={[
          {
            id: 12,
            desc: 'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu.',
            difficulty: 'Pro všechny',
            name: 'Pantomima a fyzické divadlo',
            lector: {
              name: 'Vojtěch Svoboda',
            },
          },
        ]}
      />
    ).node).to.eql(
      <Row>
        <Col md={6}>
          <WorkshopSummary
            id={12}
            desc="Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu."
            difficulty="Pro všechny"
            name="Pantomima a fyzické divadlo"
            lector={{
              name: 'Vojtěch Svoboda',
            }}
          />
        </Col>
      </Row>
    );
  });
});
