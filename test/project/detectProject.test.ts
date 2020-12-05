import path from 'path';
import getCwd from '../../src/utils/getCwd';
import Mock = jest.Mock;

const getCwdMock = getCwd as Mock;

describe('detectProject', () => {
    it('is JS project', () => {
        throw new Error();
    });

    it('is maven project', () => {
        throw new Error();
    });

    it('is unknown project', () => {
        throw new Error();
    });
});
