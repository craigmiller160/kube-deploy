import path from 'path';
import getCwd from '../../src/utils/getCwd';
import Mock = jest.Mock;
import validateDeploymentVersion from '../../src/deployment/validateDeploymentVersion';

const getCwdMock = getCwd as Mock;
const validVersion = '1.0.0';
const invalidVersion = '2.0.0';

describe('validateDeploymentVersion', () => {
    it('is valid version', () => {
        getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js'));
        validateDeploymentVersion(validVersion);
    });

    it('is not valid version', () => {
        try {
            getCwdMock.mockImplementation(() => path.resolve(process.cwd(), 'test/__data__/js'));
            validateDeploymentVersion(invalidVersion);
        } catch (ex) {
            expect(ex.message).toEqual('Deployment version 1.0.0 does not match project version 2.0.0');
            return
        }
        throw new Error('Should have thrown error');
    });
});
