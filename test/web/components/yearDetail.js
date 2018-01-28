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
        current
        endDate="2019-05-09"
        startDate="2019-05-06"
        startSignupsAt="2019-03-01T00:00:00"
        topic="Porno je taky improvizace"
        year="2019"
      />
    ).node).to.eql(
      <div className="text-center yearDetail-container">
        <div className="yearDetail-textOverlay">
          <div className="yearDetail-textOverlayHorizontalLimit">
            <div className="yearDetail-textOverlayBackground" />
          </div>
        </div>

        <div className="yearDetail-text">
          <h1>
            <span className="yearDetail-year">Improtřesk 2019 </span>
            <small className="yearDetail-topic">
              <i>Porno je taky improvizace</i>
            </small>
          </h1>
          <div className="yearDetail-upcomingDate">
            <HumanDateRange
              end="2019-05-09"
              start="2019-05-06"
            />
          </div>
        </div>
        <div className="yearDetail-buttons">
          <SignupButton
            startAt="2019-03-01T00:00:00"
            endAt="2019-05-06"
            alreadyFull={false}
          />
        </div>
      </div>
    );
  });
  it('renders without signup button when year is not current', () => {
    expect(shallow(
      <YearDetail
        endDate="2019-05-09"
        startDate="2019-05-06"
        startSignupsAt="2019-03-01T00:00:00"
        topic="Porno je taky improvizace"
        year="2019"
      />
    ).node).to.eql(
      <div className="text-center yearDetail-container">
        <div className="yearDetail-textOverlay">
          <div className="yearDetail-textOverlayHorizontalLimit">
            <div className="yearDetail-textOverlayBackground" />
          </div>
        </div>

        <div className="yearDetail-text">
          <h1>
            <span className="yearDetail-year">Improtřesk 2019 </span>
            <small className="yearDetail-topic">
              <i>Porno je taky improvizace</i>
            </small>
          </h1>
          <div className="yearDetail-upcomingDate">
            <HumanDateRange
              end="2019-05-09"
              start="2019-05-06"
            />
          </div>
        </div>
        <p className="yearDetail-text">Sledujte novinky na stránkách Improtřesku</p>
      </div>
    );
  });
});
