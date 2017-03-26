import Alert from 'react-bootstrap/lib/Alert';
import Col from 'react-bootstrap/lib/Col';
import FontAwesome from 'react-fontawesome';
import Form from 'react-bootstrap/lib/Form';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import sinon from 'sinon';
import Well from 'react-bootstrap/lib/Well';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import AccomodationPicker from '../../../src/web/components/inputs/accomodationPicker';
import Button from '../../../src/web/components/button';
import Link from '../../../src/web/components/link';
import MealPicker from '../../../src/web/components/inputs/mealPicker';
import Order from '../../../src/web/components/order';
import Price from '../../../src/web/components/price';
import WorkshopPicker from '../../../src/web/components/inputs/workshopPicker';

describe('Order form component', () => {
  it('renders', () => {
    expect(shallow(
      <Order
        accomodation={[]}
        price={1200}
        errors={{}}
        form="order"
        meals={[
          {
            id: 1325,
            date: '2017-05-06',
            name: 'lunch',
          },
        ]}
        onChange={() => {}}
        onSubmit={() => {}}
        submitted={false}
        values={{
          accomodationInfo: true,
          workshop: 42,
        }}
        workshops={[
          { id: 42, name: 'Longformy' },
          { id: 43, name: 'Hlasová průprava' },
        ]}
      />
    ).node).to.eql(
      <div>
        <h2>Přihlášení na workshop</h2>
        <p>
          Vyber si jeden workshop, víc jich za jeden Improtřesk nestihneš.
          Na workshop budeš místo na workshopu máš jisté až v momentě kdy nám
          přijdou peníze na účet.
        </p>
        <Form onSubmit={() => {}}>
          <WorkshopPicker
            disabled={false}
            name="workshop"
            onChange={() => {}}
            touched={false}
            value={42}
            workshops={[
              { id: 42, name: 'Longformy' },
              { id: 43, name: 'Hlasová průprava' },
            ]}
          />
          <Well>
            <Row>
              <Col sm={6} lg={4}>
                <h3><Link to="food">Stravování</Link></h3>
                <p>
                  Zaškrtni na který den chceš zařídit jídlo od nás. Na výběr z
                  jídelního menu a dostaneš před začátkem festivalu.
                </p>
                <MealPicker
                  name="meals"
                  meals={[
                    {
                      id: 1325,
                      date: '2017-05-06',
                      name: 'lunch',
                    },
                  ]}
                  onChange={() => {}}
                />
              </Col>
              <Col sm={6} lg={4}>
                <h3><Link to="accomodation">Ubytování</Link></h3>
                <p>
                  <b>Ubytování se platí zvlášť</b>, tedy až na checkinu a v
                  hotovosti. Základní ubytování je zdarma.
                </p>

                <AccomodationPicker
                  accomodation={[]}
                  disabled={false}
                  name="accomodation"
                  onChange={() => {}}
                  value={[]}
                />
              </Col>
            </Row>
          </Well>
          <Row>
            <Col sm={6} lg={4}>
              <h3>Metoda platby</h3>
              <p>
                V tuto chvíli je možné platit jedině bankovním
                převodem <FontAwesome name="frown-o" />. Detaily
                platby jsou v dalším kroku objednávky.
              </p>
              <Alert bsStyle="success">
                <big>
                  Částka k zaplacení:
                  {' '}
                  <Price price={1200} />
                </big>
              </Alert>
            </Col>
          </Row>
          <Button type="submit">Pokračovat</Button>
        </Form>
      </div>
    );
  });
  it('triggers onChange on workshop change', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Order
        errors={{}}
        form="order"
        onChange={changeSpy}
        onSubmit={() => {}}
        values={{
          workshop: 42,
        }}
        workshops={[
          { id: 42, name: 'Longformy' },
          { id: 43, name: 'Hlasová průprava' },
        ]}
      />
    );

    comp.find(WorkshopPicker).simulate('change', 'workshop', 42);
    expect(changeSpy.args).to.eql([
      ['order', 'workshop', 42],
    ]);
  });
  it('triggers onSubmit on form submit', () => {
    const submitSpy = sinon.spy();
    const preventDefaultSpy = sinon.spy();
    const comp = shallow(
      <Order
        errors={{}}
        form="order"
        onChange={() => {}}
        onSubmit={submitSpy}
        values={{
          workshop: 42,
        }}
        workshops={[
          { id: 42, name: 'Longformy' },
          { id: 43, name: 'Hlasová průprava' },
        ]}
      />
    );

    comp.find(Form).simulate('submit', {
      preventDefault: preventDefaultSpy,
    });
    expect(submitSpy.args).to.eql([
      ['order'],
    ]);
    expect(preventDefaultSpy.calledOnce).to.equal(true);
  });
});
