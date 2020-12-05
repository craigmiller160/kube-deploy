import path from 'path';
import fs from 'fs';
import getCwd from '../utils/getCwd';
import yaml from 'js-yaml';
import KubeDeployment from '../types/KubeDeployment';

const DEPLOY_FILE_PATH = path.join('deploy', 'deployment.yml');

export default (projectVersion: string) => {
    const deployFilePath = path.resolve(getCwd(), DEPLOY_FILE_PATH);
    const deploymentText = fs.readFileSync(deployFilePath, 'utf8');

    const deployment: KubeDeployment = yaml.safeLoad(deploymentText) as KubeDeployment;
    const image: string = deployment.spec.template.spec.containers[0].image;

    const imageParts = image.split(':');
    const deployVersion = imageParts[imageParts.length - 1];

    if (deployVersion !== projectVersion) {
        throw new Error(`Deployment version ${deployVersion} does not match project version ${projectVersion}`);
    }
};
