import detectProject, { ProjectType } from './project/detectProject';
import ProjectInfo from './types/ProjectInfo';
import getProjectJS from './project/getProjectJS';
import getProjectMaven from './project/getProjectMaven';
import findAndValidateArtifact from './artifact/findAndValidateArtifact';
import validateDeploymentVersion from './deployment/validateDeploymentVersion';

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
    const projectType: ProjectType = detectProject();
    const projectInfo: ProjectInfo = getProjectInfo(projectType);
    findAndValidateArtifact(projectType, projectInfo.version);
    validateDeploymentVersion(projectInfo.version);

    // TODO tag plus repo prefix
    // TODO docker build (in deploy directory)
    // TODO docker push
    // TODO k8s apply configmap
    // TODO k8s apply deployment
    // TODO k8s restart deployment (optional)
};

execute();
