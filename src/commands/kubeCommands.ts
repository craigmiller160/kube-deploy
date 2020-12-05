import path from 'path';
import { doSpawnSync } from '../utils/doSpawn';
import getCwd from '../utils/getCwd';
import chalk from 'chalk';

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
        console.error(chalk.red('Error executing kubectl apply configmap command'));
        process.exit(1);
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
        console.error(chalk.red('Error executing kubectl apply deployment command'));
        process.exit(1);
    }
};
