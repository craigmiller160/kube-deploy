import getCwd from '../src/utils/getCwd';
import { doSpawnSync } from '../src/utils/doSpawn';
import Mock = jest.Mock;
import path from 'path';
import execute from '../src/execution';
import { DOCKER_REPO } from '../src/utils/dockerConstants';
import shellEnv from 'shell-env';

jest.mock('shell-env', () => ({
    sync: jest.fn()
}));

const getCwdMock: Mock = getCwd as Mock;
const doSpawnSyncMock: Mock = doSpawnSync as Mock;
const jsCwd = path.resolve(process.cwd(), 'test/__data__/js');
const jsNoConfigCwd = path.resolve(process.cwd(), 'test/__data__/js-no-configmap');
const mavenCwd = path.resolve(process.cwd(), 'test/__data__/maven');
const nginxCwd = path.resolve(process.cwd(), 'test/__data__/nginx');
const syncMock: Mock = shellEnv.sync as Mock;
const tag = `${DOCKER_REPO}/sample-project:1.0.0`;
const user = 'user';
const password = 'password';

const validateCommands = (cwd: string, hasConfigMap: boolean = true) => {
    let cmdCounter = 0;
    expect(doSpawnSyncMock).toHaveBeenNthCalledWith(++cmdCounter, {
        command: 'sudo',
        args: [
            'docker',
            'login',
            DOCKER_REPO,
            '-u',
            user,
            '-p',
            password
        ]
    });
    expect(doSpawnSyncMock).toHaveBeenNthCalledWith(++cmdCounter, {
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
    expect(doSpawnSyncMock).toHaveBeenNthCalledWith(++cmdCounter, {
        command: 'sudo',
        args: [
            'docker',
            'push',
            tag
        ],
        cwd: `${cwd}/deploy`
    });
    if (hasConfigMap) {
        expect(doSpawnSyncMock).toHaveBeenNthCalledWith(++cmdCounter, {
            command: 'kubectl',
            args: [
                'apply',
                '-f',
                'configmap.yml'
            ],
            cwd: `${cwd}/deploy`
        });
    }
    expect(doSpawnSyncMock).toHaveBeenNthCalledWith(++cmdCounter, {
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
        syncMock.mockImplementation(() => ({
            NEXUS_DOCKER_USER: user,
            NEXUS_DOCKER_PASSWORD: password
        }));
    });

    it('deploys JS project', () => {
        getCwdMock.mockImplementation(() => jsCwd);
        const status = execute();
        expect(status).toEqual(0);
        validateCommands(jsCwd);
    });

    it('deploys JS project without configmap', () => {
        getCwdMock.mockImplementation(() => jsNoConfigCwd);
        const status = execute();
        expect(status).toEqual(0);
        validateCommands(jsNoConfigCwd, false);
    });

    it('deploys Maven project', () => {
        getCwdMock.mockImplementation(() => mavenCwd);
        const status = execute();
        expect(status).toEqual(0);
        validateCommands(mavenCwd);
    });

    it('deploys Nginx project', () => {
        getCwdMock.mockImplementation(() => nginxCwd);
        const status = execute();
        expect(status).toEqual(0);
        validateCommands(nginxCwd);
    });
});
