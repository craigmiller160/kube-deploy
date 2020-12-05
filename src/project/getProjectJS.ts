import path from 'path';
import ProjectInfo from '../types/ProjectInfo';
import PackageJson from '../types/PackageJson';

export default (): ProjectInfo => {
    const packageJson: PackageJson = require(path.resolve(process.cwd(), 'package.json')) as PackageJson;
    return {
        name: packageJson.name,
        version: packageJson.version
    };
};
