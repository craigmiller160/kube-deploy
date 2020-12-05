import path from 'path';
import { doSpawnSync } from '../utils/doSpawn';
import getCwd from '../utils/getCwd';
import chalk from 'chalk';
import KubeError from '../error/KubeError';

export const applyConfigMap = () => {
    const result = doSpawnSync({
       command: 'kubectl',
        args: [
            'apply',
            '-f',
            'configmap.yml'
        ],
        cwd: path.resolve(getCwd(), 'deploy')
    });
    if (result.status !== 0) {
        throw new KubeError('Error executing kubectl apply configmap command');
    }
};

export const applyDeployment = () => {
    const result = doSpawnSync({
        command: 'kubectl',
        args: [
            'apply',
            '-f',
            'deployment.yml'
        ],
        cwd: path.resolve(getCwd(), 'deploy')
    });
    if (result.status !== 0) {
        throw new KubeError('Error executing kubectl apply deployment command');
    }
};
