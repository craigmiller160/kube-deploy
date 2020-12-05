import path from 'path';

jest.mock('../src/utils/getCwd', () => jest.fn());

beforeEach(() => {
    jest.clearAllMocks();
});
