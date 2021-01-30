import path from 'path';
import getCwd from '../utils/getCwd';
import { doSpawnSync } from '../utils/doSpawn';
import KubeError from '../error/KubeError';


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

