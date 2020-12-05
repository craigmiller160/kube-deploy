import fs from 'fs';
import path from 'path';
import getCwd from '../utils/getCwd';

export enum ProjectType {
    JavaScript = 'JavaScript',
    Maven = 'Maven'
}

export default (): ProjectType => {
    const files: Array<string> = fs.readdirSync(path.resolve(getCwd()));
    if (!!files.find((file) => file === 'package.json')) {
        return ProjectType.JavaScript;
    }
    if (files.find((file) => file === 'pom.xml')) {
        return ProjectType.Maven;
    }

    throw new Error('Cannot identify project type');
};
