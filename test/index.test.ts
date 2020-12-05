import getCwd from '../src/utils/getCwd';
import { doSpawnSync } from '../src/utils/doSpawn';
import Mock = jest.Mock;
import * as path from 'path';

const getCwdMock: Mock = getCwd as Mock;
const doSpawnSyncMock: Mock = doSpawnSync as Mock;

describe('kube-deploy end-to-end', () => {
    beforeEach(() => {
        doSpawnSyncMock.mockImplementation(() => ({ status: 0 }));
    });

    it('deploys JS project', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js'));
        throw new Error();
    });

    it('deploys Maven project', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/maven'));
        throw new Error();
    });
});
