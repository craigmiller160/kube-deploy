import { CustomError } from 'ts-custom-error';

class KubeError extends CustomError {
    constructor(message: string) {
        super(message);
        // this.name = 'KubeError';
    }
}

export default KubeError;