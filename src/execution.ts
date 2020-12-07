import detectProject, { ProjectType } from './project/detectProject';
import ProjectInfo from './types/ProjectInfo';
import getProjectJS from './project/getProjectJS';
import getProjectMaven from './project/getProjectMaven';
import findAndValidateArtifact from './artifact/findAndValidateArtifact';
import validateDeploymentVersion from './deployment/validateDeploymentVersion';
import { dockerBuild, dockerPush } from './commands/dockerCommands';
import chalk from 'chalk';
import { applyConfigMap, applyDeployment } from './commands/kubeCommands';
import getProjectNginx from './project/getProjectNginx';
import path from 'path';
import fs from 'fs';
import getCwd from './utils/getCwd';

const repoPrefix = 'localhost:32000';

const getProjectInfo = (projectType: ProjectType): ProjectInfo => {
    switch (projectType) {
        case ProjectType.JavaScript:
            return getProjectJS();
        case ProjectType.Nginx:
            return getProjectNginx();
        case ProjectType.Maven:
        default:
            return getProjectMaven();
    }
};

const execute = (): number => {
    try {
        console.log('Getting Project Data');
        const projectType: ProjectType = detectProject();
        console.log(`Project Type: ${projectType}`);
        const projectInfo: ProjectInfo = getProjectInfo(projectType);

        console.log('Validating Project');
        findAndValidateArtifact(projectType, projectInfo);
        validateDeploymentVersion(projectInfo.version);

        const dockerTag = `${repoPrefix}/${projectInfo.name}:${projectInfo.version}`
        console.log(`Deploying ${dockerTag}`);

        dockerBuild(dockerTag);
        dockerPush(dockerTag);
        if (fs.existsSync(path.resolve(getCwd(), 'deploy/configmap.yml'))) {
            applyConfigMap();
        }
        applyDeployment();

        console.log(chalk.green(`Deployment complete ${dockerTag}`));
        return 0;
    } catch (ex) {
        if (ex.name === 'KubeError') {
            console.error(chalk.red(`KubeError: ${ex.message}`));
        } else {
            console.error(chalk.red(`Error: ${ex.message}`));
            console.trace(ex);
        }
        return 1;
    }
};

export default execute;
