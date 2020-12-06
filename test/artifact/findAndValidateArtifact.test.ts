import path from 'path';
import getCwd from '../../src/utils/getCwd';
import findAndValidateArtifact from '../../src/artifact/findAndValidateArtifact';
import { ProjectType } from '../../src/project/detectProject';
import ProjectInfo from '../../src/types/ProjectInfo';
import Mock = jest.Mock;

const getCwdMock: Mock = getCwd as Mock;
const validProjectInfo: ProjectInfo = {
    name: 'sample-project',
    version: '1.0.0'
};
const invalidProjectInfo: ProjectInfo = {
    name: 'sample-project',
    version: '2.0.0'
};
const jsArtifactPath = '/test/__data__/js/deploy/build/sample-project-1.0.0.zip'
const mavenArtifactPath = '/test/__data__/maven/deploy/build/sample-project-1.0.0.jar'

describe('findAndValidateArtifact', () => {
    it('Nginx artifact, therefore skips check', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/nginx'));
        const result = findAndValidateArtifact(ProjectType.Nginx, validProjectInfo);
        expect(result).toEqual('');
    });

    it('JS artifact version is valid', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js'));
        const result = findAndValidateArtifact(ProjectType.JavaScript, validProjectInfo);
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        const resultWithoutCwd = result.replace(process.cwd(), '');
        expect(resultWithoutCwd).toEqual(jsArtifactPath);
    });

    it('Maven artifact version is valid', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/maven'));
        const result = findAndValidateArtifact(ProjectType.Maven, validProjectInfo);
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        const resultWithoutCwd = result.replace(process.cwd(), '');
        expect(resultWithoutCwd).toEqual(mavenArtifactPath);
    });

    it('JS artifact version is not valid', () => {
        try {
            getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js'));
            findAndValidateArtifact(ProjectType.JavaScript, invalidProjectInfo);
        } catch (ex) {
            expect(ex.message).toEqual('Artifact version 1.0.0 does not match project version 2.0.0')
            return
        }

        throw new Error('Should have thrown error');
    });

    it('Maven artifact version is not valid', () => {
        try {
            getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/maven'));
            findAndValidateArtifact(ProjectType.Maven, invalidProjectInfo);
        } catch (ex) {
            expect(ex.message).toEqual('Artifact version 1.0.0 does not match project version 2.0.0')
            return
        }

        throw new Error('Should have thrown error');
    });

    it('too many artifacts', () => {
        try {
            getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js2'));
            findAndValidateArtifact(ProjectType.JavaScript, validProjectInfo);
        } catch (ex) {
            expect(ex.message).toEqual(expect.stringContaining('Too many possible artifacts found'));
            return
        }
        throw new Error('Should have thrown error');
    });

    it('no artifacts', () => {
        try {
            getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js3'));
            findAndValidateArtifact(ProjectType.JavaScript, validProjectInfo);
        } catch (ex) {
            expect(ex.message).toEqual(expect.stringContaining('No artifact found'));
            return
        }
        throw new Error('Should have thrown error');
    });
});
