import getCwd from '../src/utils/getCwd';
import Mock = jest.Mock;

jest.mock('../src/utils/getCwd', () => {
    return jest.fn();
});

beforeEach(() => {
    jest.clearAllMocks();
    (getCwd as Mock).mockReset();
});
