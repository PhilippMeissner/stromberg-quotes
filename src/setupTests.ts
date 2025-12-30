import '@testing-library/jest-dom';

// Mock window.scrollTo
global.scrollTo = () => {};

// Mock fetch for API calls
global.fetch = () => Promise.resolve({
  json: () => Promise.resolve({}),
} as Response);
