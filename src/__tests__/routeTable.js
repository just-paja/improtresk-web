import { getUrlPattern, idFromSlug } from '../routeTable';

describe('Route Table', () => {
  it('idFromSlug returns last piece of the slug', () => {
    expect(idFromSlug('foo-bar-10')).toBe('10');
  });

  it('idFromSlug returns null when slug is empty', () => {
    expect(idFromSlug()).toBe(null);
  });

  it('getUrlPattern returns accomodation URL for cs language', () => {
    expect(getUrlPattern('cs', 'accomodation')).toBe('/cs/ubytovani');
  });

  it('getUrlPattern returns archiveYearDetail URL for cs language', () => {
    expect(getUrlPattern('cs', 'archiveYearDetail')).toBe('/cs/archiv/:slug');
  });

  it('getUrlPattern returns conditions URL for cs language', () => {
    expect(getUrlPattern('cs', 'conditions')).toBe('/cs/podminky');
  });

  it('getUrlPattern returns contact URL for cs language', () => {
    expect(getUrlPattern('cs', 'contact')).toBe('/cs/kontakt');
  });

  it('getUrlPattern returns fees URL for cs language', () => {
    expect(getUrlPattern('cs', 'fees')).toBe('/cs/poplatky');
  });

  it('getUrlPattern returns food URL for cs language', () => {
    expect(getUrlPattern('cs', 'food')).toBe('/cs/jidlo');
  });

  it('getUrlPattern returns home URL for cs language', () => {
    expect(getUrlPattern('cs', 'home')).toBe('/cs/');
  });

  it('getUrlPattern returns location URL for cs language', () => {
    expect(getUrlPattern('cs', 'location')).toBe('/cs/lokace');
  });

  it('getUrlPattern returns newsDetail URL for cs language', () => {
    expect(getUrlPattern('cs', 'newsDetail')).toBe('/cs/novinky/:slug');
  });

  it('getUrlPattern returns participantConfirmOrder URL for cs language', () => {
    expect(getUrlPattern('cs', 'participantConfirmOrder')).toBe('/cs/ucastnik/potvrzeni');
  });

  it('getUrlPattern returns participantForgottenPassword URL for cs language', () => {
    expect(getUrlPattern('cs', 'participantForgottenPassword')).toBe('/cs/zapomenute-heslo');
  });

  it('getUrlPattern returns participantHome URL for cs language', () => {
    expect(getUrlPattern('cs', 'participantHome')).toBe('/cs/ucastnik');
  });

  it('getUrlPattern returns participantChangeFood URL for cs language', () => {
    expect(getUrlPattern('cs', 'participantChangeFood')).toBe('/cs/ucastnik/vyber-jidla');
  });

  it('getUrlPattern returns participantChangePassword URL for cs language', () => {
    expect(getUrlPattern('cs', 'participantChangePassword')).toBe('/cs/ucastnik/zmena-hesla');
  });

  it('getUrlPattern returns participantChangeWorkshop URL for cs language', () => {
    expect(getUrlPattern('cs', 'participantChangeWorkshop')).toBe('/cs/ucastnik/zmena-workshopu');
  });

  it('getUrlPattern returns participantNewPassword URL for cs language', () => {
    expect(getUrlPattern('cs', 'participantNewPassword')).toBe('/cs/nove-heslo');
  });

  it('getUrlPattern returns performerDetail URL for cs language', () => {
    expect(getUrlPattern('cs', 'performerDetail')).toBe('/cs/ucinkujici/:slug');
  });

  it('getUrlPattern returns schedule URL for cs language', () => {
    expect(getUrlPattern('cs', 'schedule')).toBe('/cs/program');
  });

  it('getUrlPattern returns signup URL for cs language', () => {
    expect(getUrlPattern('cs', 'signup')).toBe('/cs/prihlaska');
  });

  it('getUrlPattern returns tips URL for cs language', () => {
    expect(getUrlPattern('cs', 'tips')).toBe('/cs/tipy');
  });

  it('getUrlPattern returns workshopDetail URL for cs language', () => {
    expect(getUrlPattern('cs', 'workshopDetail')).toBe('/cs/workshopy/:slug');
  });

  it('getUrlPattern returns workshops URL for cs language', () => {
    expect(getUrlPattern('cs', 'workshops')).toBe('/cs/workshopy');
  });

  it('getUrlPattern returns accomodation URL for en language', () => {
    expect(getUrlPattern('en', 'accomodation')).toBe('/en/accomodation');
  });

  it('getUrlPattern returns archiveYearDetail URL for en language', () => {
    expect(getUrlPattern('en', 'archiveYearDetail')).toBe('/en/archive/:slug');
  });

  it('getUrlPattern returns conditions URL for en language', () => {
    expect(getUrlPattern('en', 'conditions')).toBe('/en/conditions');
  });

  it('getUrlPattern returns contact URL for en language', () => {
    expect(getUrlPattern('en', 'contact')).toBe('/en/contact');
  });

  it('getUrlPattern returns fees URL for en language', () => {
    expect(getUrlPattern('en', 'fees')).toBe('/en/fees');
  });

  it('getUrlPattern returns food URL for en language', () => {
    expect(getUrlPattern('en', 'food')).toBe('/en/food');
  });

  it('getUrlPattern returns home URL for en language', () => {
    expect(getUrlPattern('en', 'home')).toBe('/en/');
  });

  it('getUrlPattern returns location URL for en language', () => {
    expect(getUrlPattern('en', 'location')).toBe('/en/location');
  });

  it('getUrlPattern returns newsDetail URL for en language', () => {
    expect(getUrlPattern('en', 'newsDetail')).toBe('/en/new/:slug');
  });

  it('getUrlPattern returns participantConfirmOrder URL for en language', () => {
    expect(getUrlPattern('en', 'participantConfirmOrder')).toBe('/en/participant/confirmation');
  });

  it('getUrlPattern returns participantForgottenPassword URL for en language', () => {
    expect(getUrlPattern('en', 'participantForgottenPassword')).toBe('/en/forgotten-password');
  });

  it('getUrlPattern returns participantHome URL for en language', () => {
    expect(getUrlPattern('en', 'participantHome')).toBe('/en/participant');
  });

  it('getUrlPattern returns participantChangeFood URL for en language', () => {
    expect(getUrlPattern('en', 'participantChangeFood')).toBe('/en/participant/food-choice');
  });

  it('getUrlPattern returns participantChangePassword URL for en language', () => {
    expect(getUrlPattern('en', 'participantChangePassword')).toBe('/en/participant/change-password');
  });

  it('getUrlPattern returns participantChangeWorkshop URL for en language', () => {
    expect(getUrlPattern('en', 'participantChangeWorkshop')).toBe('/en/participant/change-workshop');
  });

  it('getUrlPattern returns participantNewPassword URL for en language', () => {
    expect(getUrlPattern('en', 'participantNewPassword')).toBe('/en/new-password');
  });

  it('getUrlPattern returns performerDetail URL for en language', () => {
    expect(getUrlPattern('en', 'performerDetail')).toBe('/en/ucinkujici/:slug');
  });

  it('getUrlPattern returns schedule URL for en language', () => {
    expect(getUrlPattern('en', 'schedule')).toBe('/en/schedule');
  });

  it('getUrlPattern returns signup URL for en language', () => {
    expect(getUrlPattern('en', 'signup')).toBe('/en/signup');
  });

  it('getUrlPattern returns tips URL for en language', () => {
    expect(getUrlPattern('en', 'tips')).toBe('/en/tips');
  });

  it('getUrlPattern returns workshopDetail URL for en language', () => {
    expect(getUrlPattern('en', 'workshopDetail')).toBe('/en/workshops/:slug');
  });

  it('getUrlPattern returns workshops URL for en language', () => {
    expect(getUrlPattern('en', 'workshops')).toBe('/en/workshops');
  });
});
