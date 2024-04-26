import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  }
}));

jest.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: jest.fn(() => ({
    data: {
      pages: [{ meta: { total_pages: 10 } }],
    },
    fetchNextPage: jest.fn(),
    hasNextPage: true,
    isFetchingNextPage: false,
    isLoading: false,
  })),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});