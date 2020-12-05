import path from 'path';
import fs from 'fs';
import { Parser } from 'xml2js';
import ProjectInfo from '../types/ProjectInfo';
import getCwd from '../utils/getCwd';

export default (): ProjectInfo => {
    const pomXml = fs.readFileSync(path.resolve(getCwd(), 'pom.xml'), 'utf8');
    const parser = new Parser();
    const parsedPomXml = parser.parseString(pomXml);
    console.log(parsedPomXml); // TODO finish this
    return { // TODO fix this
        name: '',
        version: ''
    };
}
