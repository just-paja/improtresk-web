import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import sinon from 'sinon';
import Well from 'react-bootstrap/lib/Well';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Button from '../../../src/web/components/button';
import Order from '../../../src/web/components/order';
import InputCheckbox from '../../../src/web/components/inputCheckbox';
import MealPicker from '../../../src/web/components/mealPicker';
import WorkshopPicker from '../../../src/web/components/workshopPicker';

describe('Order form component', () => {
  it('renders', () => {
    expect(shallow(
      <Order
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
        values={{
          accomodation: true,
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
            value={42}
            workshops={[
              { id: 42, name: 'Longformy' },
              { id: 43, name: 'Hlasová průprava' },
            ]}
          />
          <Well>
            <Row>
              <Col md={6}>
                <h3>Stravování</h3>
                <p>Zaškrtni na který den chceš zařídit jídlo od nás.</p>
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
              <Col md={6}>
                <h3>Ubytování</h3>
                <InputCheckbox
                  disabled={false}
                  label="Mám zájem o ubytování v hotelu"
                  name="accomodation"
                  onChange={() => {}}
                  value
                />
              </Col>
            </Row>
          </Well>
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
