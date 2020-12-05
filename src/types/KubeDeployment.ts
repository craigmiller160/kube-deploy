
export interface KubeContainer {
    name: string;
    image: string;
}

export default interface KubeDeployment {
    spec: {
        template: {
            spec: {
                containers: KubeContainer[]
            }
        }
    }
}
