import getCwd from '../src/utils/getCwd';
import { doSpawnSync } from '../src/utils/doSpawn';
import Mock = jest.Mock;

jest.mock('../src/utils/getCwd', () => {
    return jest.fn();
});

jest.mock('../src/utils/doSpawn', () => {
    return {
        doSpawnSync: jest.fn()
    };
});

beforeEach(() => {
    jest.clearAllMocks();
    (getCwd as Mock).mockReset();
    (doSpawnSync as Mock).mockReset();
});
