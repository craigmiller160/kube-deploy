import path from 'path';
import getCwd from '../../src/utils/getCwd';
import Mock = jest.Mock;
import getProjectJS from '../../src/project/getProjectJS';
import ProjectInfo from '../../src/types/ProjectInfo';

const getCwdMock = getCwd as Mock;

describe('getProjectJS', () => {
    it('reads data from package.json', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js'));
        const result: ProjectInfo = getProjectJS();
        expect(result).toEqual({
            name: 'sample-project',
            version: '1.0.0'
        });
    });

    it('reads data from package.json with prefix', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js2'));
        const result: ProjectInfo = getProjectJS();
        expect(result).toEqual({
            name: 'sample-project',
            version: '1.0.0'
        });
    });
});
