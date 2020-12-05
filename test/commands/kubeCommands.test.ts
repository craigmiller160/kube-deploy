import getCwd from '../../src/utils/getCwd';
import { doSpawnSync } from '../../src/utils/doSpawn';
import Mock = jest.Mock;
import { applyConfigMap, applyDeployment } from '../../src/commands/kubeCommands';

const getCwdMock: Mock = getCwd as Mock;
const doSpawnSyncMock: Mock = doSpawnSync as Mock;

const cwd = '/home/dir';

describe('kubeCommands', () => {
    beforeEach(() => {
        getCwdMock.mockImplementation(() => cwd);
        doSpawnSyncMock.mockImplementation(() => ({ status: 0 }));
    });

    it('applyConfigMap', () => {
        applyConfigMap();
        expect(doSpawnSyncMock).toHaveBeenCalledWith({
            command: 'kubectl',
            args: [
                'apply',
                '-f',
                'configmap.yml'
            ],
            cwd: `${cwd}/deploy`
        });
    });

    it('applyDeployment', () => {
        applyDeployment();
        expect(doSpawnSyncMock).toHaveBeenCalledWith({
            command: 'kubectl',
            args: [
                'apply',
                '-f',
                'deployment.yml'
            ],
            cwd: `${cwd}/deploy`
        });
    });
});
