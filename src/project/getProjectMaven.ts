import path from 'path';
import fs from 'fs';
import { Parser } from 'xml2js';
import ProjectInfo from '../types/ProjectInfo';
import getCwd from '../utils/getCwd';
import PomXml from '../types/PomXml';

const parseXml = (xml: string): PomXml => {
    let parsed: PomXml | null = null;
    const parser = new Parser();
    parser.parseString(xml, (error: Error, result: PomXml) => {
        if (error) {
            throw error;
        }
        parsed = result;
    });
    if (parsed !== null) {
        return parsed;
    }
    throw new Error('Parsed pom.xml should not be null');
}

export default (): ProjectInfo => {
    const pomXml = fs.readFileSync(path.resolve(getCwd(), 'pom.xml'), 'utf8');
    const parsedPomXml: PomXml = parseXml(pomXml);
    return {
        name: parsedPomXml.project.artifactId[0],
        version: parsedPomXml.project.version[0]
    };
}
