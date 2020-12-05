import path from 'path';
import getCwd from '../utils/getCwd';
import yaml from 'js-yaml';

const DEPLOY_FILE_PATH = path.join('deploy', 'deployment.yml');

export default (projectVersion: string) => {
    const deployFilePath = path.resolve(getCwd(), DEPLOY_FILE_PATH);
    const deployment = yaml.safeLoad(deployFilePath);
    console.log(deployment);
};
