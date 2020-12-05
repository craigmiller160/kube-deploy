import path from 'path';
import { SpawnSyncReturns } from 'child_process';
import { doSpawnSync } from '../utils/doSpawn';
import getCwd from '../utils/getCwd';

export const applyConfigMap = (): SpawnSyncReturns<Buffer> =>
    doSpawnSync({
        command: 'kubectl',
        args: [
            'apply',
            '-f',
            'configmap.yml'
        ],
        cwd: path.resolve(getCwd(), 'deploy')
    });

export const applyDeployment = (): SpawnSyncReturns<Buffer> =>
    doSpawnSync({
        command: 'kubectl',
        args: [
            'apply',
            '-f',
            'deployment.yml'
        ]
    });
