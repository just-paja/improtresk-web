import Alert from 'react-bootstrap/lib/Alert';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Meal from '../../../src/web/components/meal';
import FoodMenu from '../../../src/web/components/foodMenu';
import FoodMenuItem from '../../../src/web/components/foodMenuItem';
import ObjectList from '../../../src/web/components/objectList';

describe('FoodMenu component', () => {
  it('renders', () => {
    expect(shallow(
      <FoodMenu
        id={34}
        name="lunch"
        date="2016-01-02"
        food={[
          { id: 91, name: 'Knedlík' },
        ]}
        soups={[
          { id: 23, name: 'Zelená' },
        ]}
      />
    ).node).to.eql(
      <div key={34}>
        <h3><Meal name="lunch" date="2016-01-02" /></h3>
        <ObjectList
          Component={FoodMenuItem}
          data={[
            { id: 23, name: 'Zelená' },
          ]}
          md={12}
        />
        <ObjectList
          Component={FoodMenuItem}
          data={[
            { id: 91, name: 'Knedlík' },
          ]}
          md={12}
        />
      </div>
    );
  });
  it('renders alert with no courses', () => {
    expect(shallow(
      <FoodMenu
        id={34}
        name="lunch"
        date="2016-01-02"
        food={[]}
        soups={[]}
      />
    ).node).to.eql(
      <div key={34}>
        <h3><Meal name="lunch" date="2016-01-02" /></h3>
        <ObjectList
          Component={FoodMenuItem}
          data={[]}
          md={12}
        />
        <ObjectList
          Component={FoodMenuItem}
          data={[]}
          md={12}
        />
        <Alert bsStyle="info">Jídelníček pro tento den ještě připravujeme</Alert>
      </div>
    );
  });
  it('renders alert with main courses only', () => {
    expect(shallow(
      <FoodMenu
        id={34}
        name="lunch"
        date="2016-01-02"
        food={[
          { id: 23, name: 'Knedlík' },
        ]}
        soups={[]}
      />
    ).node).to.eql(
      <div key={34}>
        <h3><Meal name="lunch" date="2016-01-02" /></h3>
        <ObjectList
          Component={FoodMenuItem}
          data={[]}
          md={12}
        />
        <ObjectList
          Component={FoodMenuItem}
          data={[
            { id: 23, name: 'Knedlík' },
          ]}
          md={12}
        />
        <Alert bsStyle="info">Jídelníček pro tento den ještě připravujeme</Alert>
      </div>
    );
  });
  it('renders alert with soup courses only', () => {
    expect(shallow(
      <FoodMenu
        id={34}
        name="lunch"
        date="2016-01-02"
        food={[]}
        soups={[
          { id: 23, name: 'Zelená' },
        ]}
      />
    ).node).to.eql(
      <div key={34}>
        <h3><Meal name="lunch" date="2016-01-02" /></h3>
        <ObjectList
          Component={FoodMenuItem}
          data={[
            { id: 23, name: 'Zelená' },
          ]}
          md={12}
        />
        <ObjectList
          Component={FoodMenuItem}
          data={[]}
          md={12}
        />
        <Alert bsStyle="info">Jídelníček pro tento den ještě připravujeme</Alert>
      </div>
    );
  });
});
