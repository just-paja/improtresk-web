import { MAP } from 'react-google-maps/lib/constants';
import React from 'react';

import { shallow } from 'enzyme';

import { MarkerMapComponent } from '../MarkerMap';

describe('MarkerMap component', () => {
  it('renders google map', () => {
    const comp = shallow(
      <MarkerMapComponent
        googleMapURL="https://example.com/js?v=3.exp"
        loadingElement={<div className="loader" />}
        containerElement={<div />}
        mapElement={<div />}
        markers={[
          {
            id: 50,
            name: 'DK Milevsko',
            address: 'Nádražní 10',
            lat: 16,
            lng: 17,
          },
        ]}
      />, {
        context: {
          [MAP]: {
            setCenter: () => {},
            setZoom: () => {},
          },
        },
      }
    );
    expect(comp.find('GoogleMap')).toHaveLength(1);
  });

  it('renders markers', () => {
    const comp = shallow(
      <MarkerMapComponent
        googleMapURL="https://example.com/js?v=3.exp"
        loadingElement={<div className="loader" />}
        containerElement={<div />}
        mapElement={<div />}
        markers={[
          {
            id: 50,
            name: 'DK Milevsko',
            address: 'Nádražní 10',
            lat: 16,
            lng: 17,
          },
        ]}
      />, {
        context: {
          [MAP]: {
            setCenter: () => {},
            setZoom: () => {},
          },
        },
      }
    );
    expect(comp.find('Marker')).toHaveProp('position', {
      lat: 16,
      lng: 17,
    });
  });
});
