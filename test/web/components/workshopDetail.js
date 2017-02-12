import Col from 'react-bootstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import Markdown from 'react-markdown';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Gallery from '../../../src/web/components/gallery';
import LectorSummary from '../../../src/web/components/lectorSummary';
import PermaLink from '../../../src/web/components/permaLink';
import WorkshopDetail from '../../../src/web/components/workshopDetail';

describe('Workshop Detail component', () => {
  it('renders', () => {
    expect(shallow(
      <WorkshopDetail
        id={12}
        desc={
          'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu. ' +
          'Budeme se věnovat fyzickému tréninku a technikám k ovládnutí svého těla a ' +
          'celkovému propojení se svým tělem na jevišti. S tím souvisí i cvičení na jevištní ' +
          'přítomnost, dech, pohled a temporytmus. Podíváme se také na techniku imaginární ' +
          'pantomimy jako chůze na místě, práce s imaginárním objektem a další. Zkusíme si' +
          'základy nonverbálního herectví, tvorbu divadelní postavy podle jejího fyzična a' +
          'práci s hereckým partnerem...zkrátka uvidíme, co všechno stihneme.'}
        difficulty="Pro všechny"
        name="Pantomima a fyzické divadlo"
        photos={[]}
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
          <li>
            <FontAwesome name="hand-rock-o" />{' '}
            Pro všechny
          </li>
        </ul>

        <div>
          <Markdown
            source={
              'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu. ' +
              'Budeme se věnovat fyzickému tréninku a technikám k ovládnutí svého těla a ' +
              'celkovému propojení se svým tělem na jevišti. S tím souvisí i cvičení na jevištní ' +
              'přítomnost, dech, pohled a temporytmus. Podíváme se také na techniku imaginární ' +
              'pantomimy jako chůze na místě, práce s imaginárním objektem a další. Zkusíme si' +
              'základy nonverbálního herectví, tvorbu divadelní postavy podle jejího fyzična a' +
              'práci s hereckým partnerem...zkrátka uvidíme, co všechno stihneme.'
            }
          />
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
});
