import path from 'path';
import getCwd from '../../src/utils/getCwd';
import findAndValidateArtifact from '../../src/artifact/findAndValidateArtifact';
import { ProjectType } from '../../src/project/detectProject';
import Mock = jest.Mock;

const getCwdMock: Mock = getCwd as Mock;
const validVersion = '1.0.0';
const invalidVersion = '2.0.0';

describe('findAndValidateArtifact', () => {
    it('JS artifact version is valid', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js'));
        const result = findAndValidateArtifact(ProjectType.JavaScript, validVersion);
        expect(result).toEqual('');
    });

    it('Maven artifact version is valid', () => {
        throw new Error();
    });

    it('JS artifact version is not valid', () => {
        throw new Error();
    });

    it('Maven artifact version is not valid', () => {
        throw new Error();
    });

    it('too many artifacts', () => {
        throw new Error();
    });

    it('no artifacts', () => {
        throw new Error();
    });
});
