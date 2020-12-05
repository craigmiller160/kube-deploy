import spawn from 'cross-spawn';

export interface SpawnArgs {
    command: string;
    args: string[];
    cwd?: string;
}

// Spawn wrapper to support unit tests
export const doSpawnSync = (args: SpawnArgs) =>
    spawn.sync(args.command, args.args, {
        stdio: 'inherit',
        cwd: args.cwd
    });
