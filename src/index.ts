#!/usr/bin/env node

import detectProject, { ProjectType } from './project/detectProject';
import ProjectInfo from './types/ProjectInfo';
import getProjectJS from './project/getProjectJS';
import getProjectMaven from './project/getProjectMaven';
import findAndValidateArtifact from './artifact/findAndValidateArtifact';
import validateDeploymentVersion from './deployment/validateDeploymentVersion';
import { dockerBuild } from './commands/dockerCommands';

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
    console.log('Getting Project Data');
    const projectType: ProjectType = detectProject();
    const projectInfo: ProjectInfo = getProjectInfo(projectType);

    console.log('Validating Project');
    findAndValidateArtifact(projectType, projectInfo.version);
    validateDeploymentVersion(projectInfo.version);

    const dockerTag = `${repoPrefix}/${projectInfo.name}:${projectInfo.version}`
    console.log(`Deploying ${dockerTag}`);

    dockerBuild(dockerTag);
    console.log('Done'); // TODO delete this

    // TODO docker build (in deploy directory)
    // TODO docker push
    // TODO k8s apply configmap
    // TODO k8s apply deployment
    // TODO k8s restart deployment (optional)
};

execute();
