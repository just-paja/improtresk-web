import { expect } from 'chai';

import * as transformers from '../../../src/web/transformers/capacity';

describe('Workshop transformers', () => {
  it('aggregateCapacityData returns null when capacity is not available', () => {
    expect(transformers.aggregateCapacityData(5)).to.eql(null);
  });
  it('aggregateCapacityData returns null with unknown workshop id', () => {
    expect(transformers.aggregateCapacityData(5, [])).to.eql(null);
  });
  it('aggregateCapacityData returns capacity status', () => {
    expect(transformers.aggregateCapacityData(5, [
      {
        id: 5,
        capacity: 12,
        number_of_reservations: 3,
        number_of_unpaid_reservations: 2,
      },
    ])).to.eql({
      capacity: 12,
      assigned: 3,
      reserved: 2,
      fullyAssigned: false,
      fullyReserved: false,
      freeSpots: 7,
    });
  });
  it('aggregateCapacityData returns zero free spots with overcrowded workshop', () => {
    expect(transformers.aggregateCapacityData(5, [
      {
        id: 5,
        capacity: 12,
        number_of_reservations: 100,
        number_of_unpaid_reservations: 100,
      },
    ])).to.eql({
      capacity: 12,
      assigned: 100,
      reserved: 100,
      fullyAssigned: true,
      fullyReserved: false,
      freeSpots: 0,
    });
  });
  it('aggregateCapacityData returns fully assigned status', () => {
    expect(transformers.aggregateCapacityData(5, [
      {
        id: 5,
        capacity: 12,
        number_of_reservations: 12,
        number_of_unpaid_reservations: 0,
      },
    ])).to.eql({
      capacity: 12,
      assigned: 12,
      reserved: 0,
      fullyAssigned: true,
      fullyReserved: false,
      freeSpots: 0,
    });
  });
  it('aggregateCapacityData returns fully reserved status', () => {
    expect(transformers.aggregateCapacityData(5, [
      {
        id: 5,
        capacity: 12,
        number_of_reservations: 5,
        number_of_unpaid_reservations: 7,
      },
    ])).to.eql({
      capacity: 12,
      assigned: 5,
      reserved: 7,
      fullyAssigned: false,
      fullyReserved: true,
      freeSpots: 0,
    });
  });
});
