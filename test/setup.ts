import path from 'path';

jest.mock('../src/utils/getCwd', () => {
    return jest.fn();
});

beforeEach(() => {
    jest.clearAllMocks();
});
