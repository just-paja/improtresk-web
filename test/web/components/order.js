import Form from 'react-bootstrap/lib/Form';
import React from 'react';
import sinon from 'sinon';
import Well from 'react-bootstrap/lib/Well';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Order from '../../../src/web/components/order';
import WorkshopPicker from '../../../src/web/components/workshopPicker';

describe('Order form component', () => {
  it('renders', () => {
    expect(shallow(
      <Order
        form="order"
        onChange={() => {}}
        onSubmit={() => {}}
        values={{
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
          <Well>
            <WorkshopPicker
              name="workshop"
              onChange={() => {}}
              value={42}
              workshops={[
                { id: 42, name: 'Longformy' },
                { id: 43, name: 'Hlasová průprava' },
              ]}
            />
          </Well>
        </Form>
      </div>
    );
  });
  it('triggers onChange on workshop change', () => {
    const changeSpy = sinon.spy();
    const comp = shallow(
      <Order
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
