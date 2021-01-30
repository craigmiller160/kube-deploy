import getCwd from '../../src/utils/getCwd';
import { doSpawnSync } from '../../src/utils/doSpawn';
import Mock = jest.Mock;
import { dockerBuild, dockerLogin, dockerPush } from '../../src/commands/dockerCommands';
import shellEnv from 'shell-env';
import { DOCKER_REPO } from '../../src/utils/dockerConstants';

jest.mock('shell-env', () => ({
    sync: jest.fn()
}));

const getCwdMock: Mock = getCwd as Mock;
const doSpawnSyncMock: Mock = doSpawnSync as Mock;
const syncMock: Mock = shellEnv.sync as Mock;

const cwd = '/home/dir';
const tag = `${DOCKER_REPO}/sample-project:1.0.0`;
const user = 'user';
const password = 'password';

describe('dockerCommands', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        getCwdMock.mockImplementation(() => cwd);
        doSpawnSyncMock.mockImplementation(() => ({ status: 0 }));
        syncMock.mockImplementation(() => ({
            NEXUS_DOCKER_USER: user,
            NEXUS_DOCKER_PASSWORD: password
        }));
    });

    it('dockerLogin', () => {
        dockerLogin();
        expect(doSpawnSyncMock).toHaveBeenCalledWith({
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
    });

    it('dockerBuild', () => {
        dockerBuild(tag);
        expect(doSpawnSyncMock).toHaveBeenCalledWith({
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
    });

    it('dockerPush', () => {
        dockerPush(tag);
        expect(doSpawnSyncMock).toHaveBeenCalledWith({
            command: 'sudo',
            args: [
                'docker',
                'push',
                tag
            ],
            cwd: `${cwd}/deploy`
        });
    });
});
