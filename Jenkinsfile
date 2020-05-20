@Library('defra-library@psd-770-azure-ci')

def config = [environment: "dev"]
def containerSrcFolder = '\\/home\\/node'
def localSrcFolder = '.'
def lcovFile = './test-output/lcov.info'

node {
  checkout scm

  try {
    stage('Set GitHub status as pending') {
      build.setGithubStatusPending()
    }

    stage('Set PR, and containerTag variables') {
      (repoName, pr, containerTag, mergedPrNo) = build.getVariables(version.getPackageJsonVersion())
    }

    if (pr != '') {
      stage('Verify version incremented') {
        version.verifyPackageJsonIncremented()
      }
    }

    stage('Helm lint') {
      test.lintHelm(repoName)
    }

    // stage('Build test image') {
    //   build.buildTestImage(DOCKER_REGISTRY_CREDENTIALS_ID, DOCKER_REGISTRY, repoName, BUILD_NUMBER)
    // }

    // stage('Run tests') {
    //   build.runTests(repoName, repoName, BUILD_NUMBER)
    // }

    // stage('Create JUnit report') {
    //   test.createReportJUnit()
    // }

    // stage('Fix lcov report') {
    //   utils.replaceInFile(containerSrcFolder, localSrcFolder, lcovFile)
    // }

    // stage('Push container image') {
    //   build.buildAndPushContainerImage(DOCKER_REGISTRY_CREDENTIALS_ID, DOCKER_REGISTRY, repoName, containerTag)
    // }

    // Test the master branch branch
    pr = ''

    if (pr != '') {
      stage('Helm install') {
        helm.deployChart(config.environment, DOCKER_REGISTRY, repoName, containerTag)
      }
    }
    else {
      stage('Publish chart') {
        helm.publishChartToACR(DOCKER_REGISTRY, repoName, containerTag)
      }

      // stage('Deploy Test') {
      //   helm.deployRemoteChartFromACR(config.environment, 'ffc-ce', repoName, containerTag)
      // }

      // stage('Trigger GitHub release') {
      //   withCredentials([
      //     string(credentialsId: 'github-auth-token', variable: 'gitToken')
      //   ]) {
      //     release.trigger(containerTag, repoName, containerTag, gitToken)
      //   }
      // }

      stage('Trigger Deployment') {
        withCredentials([
          string(credentialsId: 'remote_build_token', variable: 'jenkinsToken')
        ]) {
          deploy.trigger(JENKINS_DEPLOY_SITE_ROOT, repoName, jenkinsToken, ['chartVersion': containerTag, 'environment': config.environment])
        }
      }
    }

    stage('Set GitHub status as success'){
      build.setGithubStatusSuccess()
    }
  } catch(e) {
    stage('Set GitHub status as fail') {
      build.setGithubStatusFailure(e.message)
    }

    // stage('Send build failure slack notification') {
    //   notifySlack.buildFailure(e.message, "#generalbuildfailures")
    // }

    throw e
  } finally {
    stage('Clean up test output') {
      test.deleteOutput('defradigital/node-development', containerSrcFolder)
    }
  }

  // stage("Test") {
  //   withEnv(['HELM_EXPERIMENTAL_OCI=1']) { // Need this environment variable set to enable Helm repos in ACR
  //     withKubeConfig([credentialsId: "test_kube_config"]) {
  //       withCredentials([
  //         string(credentialsId: 'test_acr_url', variable: 'acrUrl'),
  //         usernamePassword(credentialsId: 'test_acr_creds', usernameVariable: 'acrUser', passwordVariable: 'acrPwd'),
  //       ]) {
  //         def dockerImageName = "$acrUrl/$repoName:docker-$tag"
  //         def helmChartName = "$acrUrl/$repoName:helm-$tag"
  //         def deploymentName = "$repoName-$tag"
  //         def tmpDir = "./install"

  //         // Build and push docker container
  //         sh "az acr login --name $acrUrl --username $acrUser --password $acrPwd"

  //         sh "docker-compose -f docker-compose.yaml build --no-cache"
  //         sh "docker tag $repoName $dockerImageName"
  //         sh "docker push $dockerImageName"

  //         // Build and push Helm chart
  //         sh "helm registry login $acrUrl --username $acrUser --password $acrPwd"
  //         sh "helm chart save helm/$repoName $helmChartName"
  //         sh "helm chart push $helmChartName"

  //         // Create K8s namespace
  //         sh "kubectl get namespaces $namespace || kubectl create namespace $namespace"

  //         // Install Helm chart on K8s cluster:
  //         // First remove local cached copy and pull from ACR (just to demonstrate it actually works)
  //         // Then pull the chart and install
  //         sh "helm chart remove $helmChartName"
  //         sh "helm chart pull $helmChartName"
  //         sh "helm chart export $helmChartName --destination $tmpDir"
  //         sh "helm upgrade $deploymentName $tmpDir/$repoName --install --atomic --namespace=$namespace --set image=$dockerImageName"
  //       }
  //     }
  //   }
  // }
}
