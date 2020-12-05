import detectProject, { ProjectType } from './project/detectProject';
import ProjectInfo from './types/ProjectInfo';
import getProjectJS from './project/getProjectJS';
import getProjectMaven from './project/getProjectMaven';

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
};

execute();
