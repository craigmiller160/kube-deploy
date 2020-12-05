import path from 'path';
import getCwd from '../utils/getCwd';
import { doSpawnSync } from '../utils/doSpawn';
import chalk from 'chalk';

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
        console.error(chalk.red('Error executing docker build command'));
        process.exit(1);
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
        console.error(chalk.red('Error executing docker push command'));
        process.exit(1);
    }
};

