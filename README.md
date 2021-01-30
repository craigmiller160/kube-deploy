# kube-deploy

A utility script for automating the deployment of my applications to my local K8s cluster.

## Setting up

Run `yarn` to install all dependencies.

Make sure that the necessary Docker credentials for the Nexus repo are on the machine via environment variables:

```
NEXUS_DOCKER_USER
NEXUS_DOCKER_PASSWORD
```

## Supported Project Types

This script needs to be able to read project configuration in order to run. The following project types are supported:

1. JavaScript (package.json)
1. Maven (pom.xml)
1. Nginx (My special nginx project type)

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

First, build the project with `yarn build`. Then publish it to Nexus with `yarn publish`.

## Using Script

First, install it on the target machine with `npm i -g @craigmiller160/kube-deploy`. Alternatively, to upgrade, use `npm u -g @craigmiller160/kube-deploy`.

Then just run `kube-deploy` in the root of the project.