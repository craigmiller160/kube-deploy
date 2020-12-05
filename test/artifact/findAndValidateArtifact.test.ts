import path from 'path';
import getCwd from '../../src/utils/getCwd';
import findAndValidateArtifact from '../../src/artifact/findAndValidateArtifact';
import { ProjectType } from '../../src/project/detectProject';
import Mock = jest.Mock;

const getCwdMock: Mock = getCwd as Mock;
const validVersion = '1.0.0';
const invalidVersion = '2.0.0';
const jsArtifactPath = '/test/__data__/js/deploy/build/sample-project-1.0.0.zip'
const mavenArtifactPath = '/test/__data__/maven/deploy/build/sample-project-1.0.0.jar'

describe('findAndValidateArtifact', () => {
    it('JS artifact version is valid', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js'));
        const result = findAndValidateArtifact(ProjectType.JavaScript, validVersion);
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        const resultWithoutCwd = result.replace(process.cwd(), '');
        expect(resultWithoutCwd).toEqual(jsArtifactPath);
    });

    it('Maven artifact version is valid', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/maven'));
        const result = findAndValidateArtifact(ProjectType.Maven, validVersion);
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        const resultWithoutCwd = result.replace(process.cwd(), '');
        expect(resultWithoutCwd).toEqual(mavenArtifactPath);
    });

    it('JS artifact version is not valid', () => {
        try {
            getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js'));
            findAndValidateArtifact(ProjectType.JavaScript, invalidVersion);
        } catch (ex) {
            expect(ex.message).toEqual('Artifact version 1.0.0 does not match project version 2.0.0')
            return
        }

        throw new Error('Should have thrown error');
    });

    it('Maven artifact version is not valid', () => {
        try {
            getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/maven'));
            findAndValidateArtifact(ProjectType.Maven, invalidVersion);
        } catch (ex) {
            expect(ex.message).toEqual('Artifact version 1.0.0 does not match project version 2.0.0')
            return
        }

        throw new Error('Should have thrown error');
    });

    it('too many artifacts', () => {
        throw new Error();
    });

    it('no artifacts', () => {
        throw new Error();
    });
});
