import * as selectors from '../participant';

describe('Participant selectors', () => {
  it('getParticipantDetailState returns participant data', () => {
    expect(selectors.getParticipantDetailState({
      participants: {
        detail: {
          data: {
            id: 684,
          },
        },
      },
    })).toEqual({
      data: {
        id: 684,
      },
    });
  });

  it('getParticipantDetail returns participant data', () => {
    expect(selectors.getParticipantDetail({
      participants: {
        detail: {
          data: {
            id: 684,
          },
        },
      },
    })).toEqual({
      id: 684,
    });
  });
});
