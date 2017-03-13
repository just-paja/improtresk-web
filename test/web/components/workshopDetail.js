import Col from 'react-bootstrap/lib/Col';
import Markdown from 'react-markdown';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Gallery from '../../../src/web/components/gallery';
import LectorSummary from '../../../src/web/components/lectorSummary';
import PermaLink from '../../../src/web/components/permaLink';
import PriceList from '../../../src/web/components/priceList';
import Prop from '../../../src/web/components/prop';
import WorkshopDetail from '../../../src/web/components/workshopDetail';

describe('Workshop Detail component', () => {
  it('renders', () => {
    expect(shallow(
      <WorkshopDetail
        id={12}
        desc="Na workshopu se zaměříme na práci s tělem, nonverbální."
        difficulty="Pro všechny"
        name="Pantomima a fyzické divadlo"
        photos={[]}
        prices={[
          {
            id: 2,
            name: 'Zlevněná',
            takesEffectOn: '2016-01-02',
            endsOn: '2016-01-05',
            price: 1200,
          },
          {
            id: 5,
            name: 'Základní',
            takesEffectOn: '2016-01-05',
            price: 1900,
          },
        ]}
        lectors={[
          {
            id: 5,
            role: 'Hlavní lektor',
            lector: {
              name: 'Vojtěch Svoboda',
              photos: [],
              about: 'Herectví se věnuje odmalička, kdy ztvárnil',
            },
          },
        ]}
      />
    ).node).to.eql(
      <div>
        <h1>
          <PermaLink id={12} title="Pantomima a fyzické divadlo" to="workshops:item">
            Pantomima a fyzické divadlo
          </PermaLink>
        </h1>

        <ul className="list-unstyled">
          <Prop icon="hand-rock-o" label="Náročnost">Pro všechny</Prop>
          <Prop icon="money" label="Cena">
            <PriceList
              prices={[
                {
                  id: 2,
                  name: 'Zlevněná',
                  takesEffectOn: '2016-01-02',
                  endsOn: '2016-01-05',
                  price: 1200,
                },
                {
                  id: 5,
                  name: 'Základní',
                  takesEffectOn: '2016-01-05',
                  price: 1900,
                },
              ]}
            />
          </Prop>
        </ul>

        <div>
          <Markdown source="Na workshopu se zaměříme na práci s tělem, nonverbální." />
        </div>

        <Gallery photos={[]} />

        <Row>
          <Col md={6}>
            <LectorSummary
              name="Vojtěch Svoboda"
              position="Hlavní lektor"
              about="Herectví se věnuje odmalička, kdy ztvárnil"
              photos={[]}
            />
          </Col>
        </Row>
      </div>
    );
  });
  it('renders without prices', () => {
    expect(shallow(
      <WorkshopDetail
        id={12}
        desc="Na workshopu se zaměříme na práci s tělem, nonverbální."
        difficulty="Pro všechny"
        name="Pantomima a fyzické divadlo"
        photos={[]}
        prices={[]}
        lectors={[]}
      />
    ).node).to.eql(
      <div>
        <h1>
          <PermaLink id={12} title="Pantomima a fyzické divadlo" to="workshops:item">
            Pantomima a fyzické divadlo
          </PermaLink>
        </h1>

        <ul className="list-unstyled">
          <Prop icon="hand-rock-o" label="Náročnost">Pro všechny</Prop>
          <Prop icon="money" label="Cena" />
        </ul>

        <div>
          <Markdown source="Na workshopu se zaměříme na práci s tělem, nonverbální." />
        </div>

        <Gallery photos={[]} />
        <Row />
      </div>
    );
  });
});
