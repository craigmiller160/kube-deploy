import path from 'path';
import getCwd from '../../src/utils/getCwd';
import Mock = jest.Mock;
import ProjectInfo from '../../src/types/ProjectInfo';
import getProjectMaven from '../../src/project/getProjectMaven';

const getCwdMock = getCwd as Mock;

describe('getProjectMaven',  () => {
    it('gets maven project info',  () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/maven'));
        const result: ProjectInfo = getProjectMaven();
        expect(result).toEqual({
            name: 'sample-project',
            version: '1.0.0'
        });
    });
});
