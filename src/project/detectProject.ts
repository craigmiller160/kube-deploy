import fs from 'fs';
import path from 'path';
import getCwd from '../utils/getCwd';
import KubeError from '../error/KubeError';

export enum ProjectType {
    JavaScript = 'JavaScript',
    Maven = 'Maven',
    Nginx = 'Nginx'
}

export default (): ProjectType => {
    const files: Array<string> = fs.readdirSync(path.resolve(getCwd()));
    if (!!files.find((file) => file === 'package.json')) {
        return ProjectType.JavaScript;
    }
    if (!!files.find((file) => file === 'pom.xml')) {
        return ProjectType.Maven;
    }
    if (!!files.find((file) => file === 'nginx.json')) {
        return ProjectType.Nginx;
    }

    throw new KubeError('Cannot identify project type');
};
