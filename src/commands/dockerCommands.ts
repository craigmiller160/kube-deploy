import path from 'path';
import getCwd from '../utils/getCwd';
import { doSpawnSync } from '../utils/doSpawn';
import KubeError from '../error/KubeError';
import shellEnv from 'shell-env';
import { DOCKER_REPO } from '../utils/dockerConstants';

interface Environment {
    NEXUS_DOCKER_USER: string;
    NEXUS_DOCKER_PASSWORD: string;
}

export const dockerLogin = () => {
    const {
        NEXUS_DOCKER_USER,
        NEXUS_DOCKER_PASSWORD
    } = shellEnv.sync<Environment>();

    const result = doSpawnSync({
        command: 'sudo',
        args: [
            'docker',
            'login',
            DOCKER_REPO,
            '-u',
            NEXUS_DOCKER_USER,
            '-p',
            NEXUS_DOCKER_PASSWORD
        ]
    });
    if (result.status !== 0) {
        throw new KubeError('Error executing docker login command');
    }
};

export const dockerBuild = (tag: string) => {
    const result = doSpawnSync({
        command: 'sudo',
        args: [
            'docker',
            'build',
            '--network=host',
            '-t',
            tag,
            '.'
        ],
        cwd: path.resolve(getCwd(), 'deploy')
    });
    if (result.status !== 0) {
        throw new KubeError('Error executing docker build command');
    }
};

export const dockerPush = (tag: string) => {
    const result = doSpawnSync({
        command: 'sudo',
        args: [
            'docker',
            'push',
            tag
        ],
        cwd: path.resolve(getCwd(), 'deploy')
    });
    if (result.status !== 0) {
        throw new KubeError('Error executing docker push command');
    }
};

