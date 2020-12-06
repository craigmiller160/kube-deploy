import path from 'path';
import getCwd from '../utils/getCwd';
import ProjectInfo from '../types/ProjectInfo';
import NginxJson from '../types/NginxJson';

export default (): ProjectInfo => {
    const nginxJson: NginxJson = require(path.resolve(getCwd(), 'nginx.json')) as NginxJson;
    return {
        name: nginxJson.name,
        version: nginxJson.version
    };
};