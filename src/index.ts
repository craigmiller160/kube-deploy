#!/usr/bin/env node

import detectProject, { ProjectType } from './project/detectProject';
import ProjectInfo from './types/ProjectInfo';
import getProjectJS from './project/getProjectJS';
import getProjectMaven from './project/getProjectMaven';
import findAndValidateArtifact from './artifact/findAndValidateArtifact';
import validateDeploymentVersion from './deployment/validateDeploymentVersion';
import { dockerBuild } from './commands/dockerCommands';
import chalk from 'chalk';

// TODO use chalk to get colors

const repoPrefix = 'localhost:32000';

const getProjectInfo = (projectType: ProjectType): ProjectInfo => {
    switch (projectType) {
        case ProjectType.JavaScript:
            return getProjectJS();
        case ProjectType.Maven:
        default:
            return getProjectMaven();
    }
};

const execute = () => {
    try {
        console.log('Getting Project Data');
        const projectType: ProjectType = detectProject();
        const projectInfo: ProjectInfo = getProjectInfo(projectType);

        console.log('Validating Project');
        findAndValidateArtifact(projectType, projectInfo.version);
        validateDeploymentVersion(projectInfo.version);

        const dockerTag = `${repoPrefix}/${projectInfo.name}:${projectInfo.version}`
        console.log(`Deploying ${dockerTag}`);

        dockerBuild(dockerTag);

        // TODO docker build (in deploy directory)
        // TODO docker push
        // TODO k8s apply configmap
        // TODO k8s apply deployment
        // TODO k8s restart deployment (optional)

        console.log(chalk.green(`Deployment complete ${dockerTag}`));
    } catch (ex) {
        if (ex.name === 'KubeError') {
            console.error(chalk.red(ex.message));
        } else {
            console.error(chalk.red(ex.message));
            console.trace(ex);
        }
    }
};

execute();
