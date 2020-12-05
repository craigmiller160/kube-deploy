import path from 'path';
import getCwd from '../utils/getCwd';

const DEPLOY_DIR_PATH = 'deploy';

export default (projectVersion: string) => {
    const deployDirPath = path.resolve(getCwd(), DEPLOY_DIR_PATH);
    // TODO finish this
};
