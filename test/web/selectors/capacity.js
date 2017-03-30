import { expect } from 'chai';

import {
  isPolling,
  getCapacity,
  getWorkshopCapacity,
} from '../../../src/web/selectors/capacity';

describe('Accomodation selectors', () => {
  it('isPolling returns true when polling', () => {
    expect(isPolling({
      capacity: {
        polling: true,
      },
    })).to.equal(true);
  });
  it('isPolling returns false when not polling', () => {
    expect(isPolling({
      capacity: {
        polling: false,
      },
    })).to.equal(false);
  });
  it('getCapacity returns capacity data', () => {
    expect(getCapacity({
      capacity: {
        data: {
          accomodation: [],
          workshops: [],
        },
      },
    })).to.eql({
      accomodation: [],
      workshops: [],
    });
  });
  it('getWorkshopCapacity returns workshop capacity data', () => {
    expect(getWorkshopCapacity({
      capacity: {
        data: {
          accomodation: [],
          workshops: [
            {
              id: 1,
              freeSpots: 10,
            },
          ],
        },
      },
    })).to.eql([
      {
        id: 1,
        freeSpots: 10,
      },
    ]);
  });
  it('getWorkshopCapacity returns empty array when workshop capacity data is not available', () => {
    expect(getWorkshopCapacity({
      capacity: {
        data: {},
      },
    })).to.eql([]);
  });
});
