import getCwd from '../src/utils/getCwd';
import { doSpawnSync } from '../src/utils/doSpawn';
import Mock = jest.Mock;
import path from 'path';
import execute from '../src/execution';

const getCwdMock: Mock = getCwd as Mock;
const doSpawnSyncMock: Mock = doSpawnSync as Mock;

describe('kube-deploy end-to-end', () => {
    beforeEach(() => {
        doSpawnSyncMock.mockImplementation(() => ({ status: 0 }));
    });

    it('deploys JS project', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js'));
        const status = execute();
        expect(status).toEqual(0);
    });

    it('deploys Maven project', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/maven'));
        const status = execute();
        expect(status).toEqual(0);
    });
});
