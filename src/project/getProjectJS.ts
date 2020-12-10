import path from 'path';
import ProjectInfo from '../types/ProjectInfo';
import PackageJson from '../types/PackageJson';
import getCwd from '../utils/getCwd';

export default (): ProjectInfo => {
    const packageJson: PackageJson = require(path.resolve(getCwd(), 'package.json')) as PackageJson;
    return {
        name: packageJson.name.replace('@craigmiller160/', ''),
        version: packageJson.version
    };
};
