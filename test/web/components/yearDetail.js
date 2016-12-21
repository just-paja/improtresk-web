import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import HumanDateRange from '../../../src/web/components/humanDateRange';
import SignupButton from '../../../src/web/components/signupButton';
import YearDetail from '../../../src/web/components/yearDetail';

describe('Year Detail component', () => {
  it('renders', () => {
    expect(shallow(
      <YearDetail
        endAt="2019-05-09"
        startAt="2019-05-06"
        startSignupsAt="2019-03-01T00:00:00"
        topic="Porno je taky improvizace"
        year="2019"
      />
    ).node).to.eql(
      <div className="text-center">
        <h1>Improtřesk 2019 <small className="yearDetail-topic">
          <i>Porno je taky improvizace</i>
        </small></h1>
        <div className="yearDetail-upcomingDate">
          <HumanDateRange
            end="2019-05-09"
            start="2019-05-06"
          />
        </div>
        <SignupButton
          startAt="2019-03-01T00:00:00"
          endAt="2019-05-06"
          alreadyFull={false}
        />
      </div>
    );
  });
});
