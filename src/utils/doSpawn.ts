import spawn from 'cross-spawn';

// Spawn wrapper to support unit tests
export const doSpawnSync = (command: string, args: string[], cwd?: string) =>
    spawn.sync(command, args, {
        stdio: 'inherit',
        cwd
    });
