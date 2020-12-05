import path from 'path';
import fs from 'fs';
import { ProjectType } from '../project/detectProject';
import getCwd from '../utils/getCwd';
import KubeError from '../error/KubeError';

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
        throw new KubeError(`No artifact found in ${buildDir} for project type ${projectType}`);
    }

    if (artifacts.length > 1) {
        throw new KubeError(`Too many possible artifacts found in ${buildDir} for project type ${projectType}`);
    }

    const parts = artifacts[0].replace(new RegExp(`\.${ext}$`), '').split('-');
    const version = parts[parts.length - 1];
    if (version !== projectVersion) {
        throw new KubeError(`Artifact version ${version} does not match project version ${projectVersion}`);
    }

    return path.resolve(buildDir, artifacts[0]);
};
