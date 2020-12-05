import fs from 'fs';
import path from 'path';

export enum ProjectType {
    JavaScript,
    Maven
}

export default (): ProjectType => {
    const files: Array<string> = fs.readdirSync(path.resolve(process.cwd()));
    if (!!files.find((file) => file === 'package.json')) {
        return ProjectType.JavaScript;
    }
    if (files.find((file) => file === 'pom.xml')) {
        return ProjectType.Maven;
    }

    throw new Error('Cannot identify project type');
};
