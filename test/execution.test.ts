import getCwd from '../src/utils/getCwd';
import { doSpawnSync } from '../src/utils/doSpawn';
import Mock = jest.Mock;
import path from 'path';
import execute from '../src/execution';

const getCwdMock: Mock = getCwd as Mock;
const doSpawnSyncMock: Mock = doSpawnSync as Mock;
const jsCwd = path.resolve(process.cwd(), 'test/__data__/js');
const mavenCwd = path.resolve(process.cwd(), 'test/__data__/maven');
const nginxCwd = path.resolve(process.cwd(), 'test/__data__/nginx');
const tag = 'localhost:32000/sample-project:1.0.0';

const validateCommands = (cwd: string) => {
    expect(doSpawnSyncMock).toHaveBeenNthCalledWith(1, {
        command: 'sudo',
        args: [
            'docker',
            'build',
            '--network=host',
            '-t',
            tag,
            '.'
        ],
        cwd: `${cwd}/deploy`
    });
    expect(doSpawnSyncMock).toHaveBeenNthCalledWith(2, {
        command: 'sudo',
        args: [
            'docker',
            'push',
            tag
        ],
        cwd: `${cwd}/deploy`
    });
    expect(doSpawnSyncMock).toHaveBeenNthCalledWith(3, {
        command: 'kubectl',
        args: [
            'apply',
            '-f',
            'configmap.yml'
        ],
        cwd: `${cwd}/deploy`
    });
    expect(doSpawnSyncMock).toHaveBeenNthCalledWith(4, {
        command: 'kubectl',
        args: [
            'apply',
            '-f',
            'deployment.yml'
        ],
        cwd: `${cwd}/deploy`
    });
};

describe('kube-deploy end-to-end', () => {
    beforeEach(() => {
        doSpawnSyncMock.mockImplementation(() => ({ status: 0 }));
    });

    it('deploys JS project', () => {
        getCwdMock.mockImplementation(() => jsCwd);
        const status = execute();
        expect(status).toEqual(0);
        validateCommands(jsCwd);
    });

    it('deploys JS project without configmap', () => {
        throw new Error();
    });

    it('deploys Maven project', () => {
        getCwdMock.mockImplementation(() => mavenCwd);
        const status = execute();
        expect(status).toEqual(0);
        validateCommands(mavenCwd);
    });

    it('deploys Nginx project', () => {
        throw new Error();
    });
});
