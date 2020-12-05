import path from 'path';
import getCwd from '../utils/getCwd';
import { doSpawnSync } from '../utils/doSpawn';
import { SpawnSyncReturns } from 'child_process';

export const dockerBuild = (tag: string): SpawnSyncReturns<Buffer> =>
    doSpawnSync({
        command: 'docker',
        args: [
            'build',
            '--network=host',
            `-t ${tag}`,
            '.'
        ],
        cwd: path.resolve(getCwd(), 'deploy')
    });

export const dockerPush = (tag: string): SpawnSyncReturns<Buffer> =>
    doSpawnSync({
        command: 'docker',
        args: [
            'push',
            tag
        ],
        cwd: path.resolve(getCwd(), 'deploy')
    });
