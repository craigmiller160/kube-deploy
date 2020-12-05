# kube-deploy

A utility script for automating the deployment of my applications to my local K8s cluster.

## Setting up

Run `yarn` to install all dependencies.

## Supported Project Types

This script needs to be able to read project configuration in order to run. The following project types are supported:

1. JavaScript (package.json)
1. Maven (pom.xml)

## Project Structure

This script expects all projects to conform to the following structure. Substitute pom.xml & .jar file for the values for the project type in question.

```
deploy/
    build/
        artifact.jar
    Dockerfile
    configmap.yml
    deployment.yml
pom.xml
```

## Deploying Script

First, build the project with `yarn build`. Then, link it to Node's globals directory with `npm link`. NPM must be used, for some reason Yarn won't work for this.