import getCwd from '../../src/utils/getCwd';
import Mock = jest.Mock;

describe('getProjectJS', () => {
    it('reads data from package.json', () => {
        jest.fn()
        (getCwd as Mock).mockImplementation(() => 'foo/bar');
        console.log(getCwd())
    });
});
