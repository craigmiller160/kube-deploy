import path from 'path';
import fs from 'fs';
import { ProjectType } from '../project/detectProject';
import getCwd from '../utils/getCwd';

const DEPLOY_BUILD_DIR = path.join('deploy', 'build');

const getArtifactExt = (projectType: ProjectType): string => {
    switch (projectType) {
        case ProjectType.JavaScript:
            return 'zip';
        case ProjectType.Maven:
        default:
            return 'jar'
    }
};

export default (projectType: ProjectType, projectVersion: string): string => {
    const ext = getArtifactExt(projectType);
    const buildDir = path.resolve(getCwd(), DEPLOY_BUILD_DIR);
    const files: string[] = fs.readdirSync(buildDir);
    const artifacts = files.filter((file) => file.endsWith(ext));

    if (artifacts.length === 0) {
        throw new Error(`No artifact found in ${buildDir} for project type ${projectType}`);
    }

    if (artifacts.length > 0) {
        throw new Error(`Too many possible artifacts found in ${buildDir} for project type ${projectType}`);
    }

    return ''; // TODO fix this
};
