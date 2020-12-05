import path from 'path';
import fs from 'fs';
import { Parser } from 'xml2js';
import ProjectInfo from '../types/ProjectInfo';
import getCwd from '../utils/getCwd';

const parseXml = (xml: string): any => {
    let parsed: any;
    const parser = new Parser();
    parser.parseString(xml, (error: Error, result: any) => {
        if (error) {
            throw error;
        }
        parsed = result;
    });
    return parsed;
}

export default (): ProjectInfo => {
    const pomXml = fs.readFileSync(path.resolve(getCwd(), 'pom.xml'), 'utf8');
    const parsedPomXml = parseXml(pomXml);
    console.log(parsedPomXml); // TODO delete this
    return { // TODO fix this
        name: '',
        version: ''
    };
}
