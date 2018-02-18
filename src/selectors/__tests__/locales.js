import * as selectors from '../locales';

describe('Session selectors', () => {
  const origWindow = global.window;
  let mockWindow;
  let mockedWindow;

  beforeEach(() => {
    mockWindow = (value) => {
      mockedWindow = value;
    };
    Object.defineProperty(global, 'window', {
      get: () => mockedWindow,
    });
  });

  afterAll(() => {
    Object.defineProperty(global, 'window', {
      value: origWindow,
    });
  });

  it('getPreferredLanguages returns empty array when window is not defined', () => {
    mockWindow(null);
    expect(selectors.getPreferredLanguages({
      server: {},
    })).toEqual([]);
  });

  it('getPreferredLanguages returns languages client preferred languages', () => {
    mockWindow({
      navigator: {
        languages: ['en', 'en-US'],
      },
    });
    expect(selectors.getPreferredLanguages({
      server: {},
    })).toEqual(['en', 'en-US']);
  });

  it('getPreferredLanguages returns language from window path', () => {
    mockWindow({
      location: {
        href: '/de/home',
      },
    });
    expect(selectors.getPreferredLanguages({
      server: {},
    })).toEqual(['de']);
  });

  it('getPreferredLanguages returns client language', () => {
    mockWindow({
      navigator: {
        language: 'en-US',
      },
    });
    expect(selectors.getPreferredLanguages({
      server: {},
    })).toEqual(['en-US']);
  });

  it('getPreferredLanguages returns languages from path combined with client preferred languages', () => {
    mockWindow({
      location: {
        href: '/en/home',
      },
      navigator: {
        languages: ['cs-CZ', 'en-GB'],
      },
    });
    expect(selectors.getPreferredLanguages({
      server: {},
    })).toEqual(['en-GB', 'cs-CZ']);
  });

  it('getPreferredLanguages returns languages from path combined with client language', () => {
    mockWindow({
      location: {
        href: '/en/home',
      },
      navigator: {
        language: 'en-GB',
      },
    });
    expect(selectors.getPreferredLanguages({
      server: {},
    })).toEqual(['en-GB']);
  });

  it('getPreferredLanguages returns language from path above client preferred languages when they do not match', () => {
    mockWindow({
      location: {
        href: '/de/home',
      },
      navigator: {
        languages: ['cs-CZ', 'en-GB'],
      },
    });
    expect(selectors.getPreferredLanguages({
      server: {},
    })).toEqual(['de', 'cs-CZ', 'en-GB']);
  });

  it('getPreferredLanguages returns language from path above client language when they do not match', () => {
    mockWindow({
      location: {
        href: '/de/home',
      },
      navigator: {
        language: 'cs-CZ',
      },
    });
    expect(selectors.getPreferredLanguages({
      server: {},
    })).toEqual(['de', 'cs-CZ']);
  });
});
