import path from 'path';
import getCwd from '../../src/utils/getCwd';
import Mock = jest.Mock;
import detectProject, { ProjectType } from '../../src/project/detectProject';

const getCwdMock = getCwd as Mock;

describe('detectProject', () => {
    it('is JS project', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js'));
        const result: ProjectType = detectProject();
        expect(result).toEqual(ProjectType.JavaScript);
    });

    it('is maven project', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/maven'));
        const result: ProjectType = detectProject();
        expect(result).toEqual(ProjectType.Maven);
    });

    it('is unknown project', () => {
        try {
            getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__'));
            detectProject();
        } catch (ex) {
            expect(ex.message).toEqual('Cannot identify project type');
            return;
        }

        throw new Error('Should have thrown error');
    });
});
