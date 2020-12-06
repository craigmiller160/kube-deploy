import getCwd from '../../src/utils/getCwd';
import Mock = jest.Mock;
import path from "path";
import ProjectInfo from '../../src/types/ProjectInfo';
import getProjectNginx from '../../src/project/getProjectNginx';

const getCwdMock = getCwd as Mock;

describe('getProjectNginx', () => {
    it('gets nginx project info', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/nginx'));
        const result: ProjectInfo = getProjectNginx();
        expect(result).toEqual({
            name: 'sample-project',
            version: '1.0.0'
        });
    });
});