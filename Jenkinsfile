@Library('defra-library@v-6')

def namespace = 'paul-test-ci'
def tag = 'test-ci'

node {
  checkout scm

  try {
    stage('Set GitHub status as pending') {
      build.setGithubStatusPending()
    }

    stage('Set PR, and containerTag variables') {
      (repoName, pr, containerTag, mergedPrNo) = build.getVariables(version.getPackageJsonVersion())
    }
  } catch(e) {
    // stage('Set GitHub status as fail') {
    //   build.setGithubStatusFailure(e.message)
    // }

    // stage('Send build failure slack notification') {
    //   notifySlack.buildFailure(e.message, "#generalbuildfailures")
    // }

    // if (config.containsKey("failureClosure")) {
    //   config["failureClosure"]()
    // }

    throw e
  } finally {
    // stage('Clean up test output') {
    //   test.deleteOutput('defradigital/node-development', containerSrcFolder)
    // }

    // if (config.containsKey("finallyClosure")) {
    //   config["finallyClosure"]()
    // }
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

// def call(Map config=[:]) {
//   def containerSrcFolder = '\\/home\\/node'
//   def localSrcFolder = '.'
//   def lcovFile = './test-output/lcov.info'
//   def sonarQubeEnv = 'SonarQube'
//   def sonarScanner = 'SonarScanner'
//   def qualityGateTimeout = 10
//   def repoName = ''
//   def pr = ''
//   def containerTag = ''
//   def mergedPrNo = ''

//   node {
//     checkout scm
//     try {
//       stage('Set GitHub status as pending') {
//         build.setGithubStatusPending()
//       }

//       stage('Set PR, and containerTag variables') {
//         (repoName, pr, containerTag, mergedPrNo) = build.getVariables(version.getPackageJsonVersion())
//       }

//       if (pr != '') {
//         stage('Verify version incremented') {
//           version.verifyPackageJsonIncremented()
//         }
//       }

//       if (config.containsKey("validateClosure")) {
//         config["validateClosure"]()
//       }

//       stage('Helm lint') {
//         test.lintHelm(repoName)
//       }

//       stage('Build test image') {
//         build.buildTestImage(DOCKER_REGISTRY_CREDENTIALS_ID, DOCKER_REGISTRY, repoName, BUILD_NUMBER)
//       }

//       if (config.containsKey("buildClosure")) {
//         config["buildClosure"]()
//       }

//       stage('Run tests') {
//         build.runTests(repoName, repoName, BUILD_NUMBER)
//       }

//       stage('Create JUnit report') {
//         test.createReportJUnit()
//       }

//       stage('Fix lcov report') {
//         utils.replaceInFile(containerSrcFolder, localSrcFolder, lcovFile)
//       }

//       stage('SonarQube analysis') {
//         test.analyseCode(sonarQubeEnv, sonarScanner, test.buildCodeAnalysisDefaultParams(repoName))
//       }

//       stage("Code quality gate") {
//         test.waitForQualityGateResult(qualityGateTimeout)
//       }

//       if (config.containsKey("testClosure")) {
//         config["testClosure"]()
//       }

//       stage('Push container image') {
//         build.buildAndPushContainerImage(DOCKER_REGISTRY_CREDENTIALS_ID, DOCKER_REGISTRY, repoName, containerTag)
//       }

//       if (pr != '') {
//         stage('Helm install') {
//           helm.deployChart(config.environment, DOCKER_REGISTRY, repoName, containerTag)
//         }
//       }
//       else {
//         stage('Publish chart') {
//           helm.publishChart(DOCKER_REGISTRY, repoName, containerTag)
//         }

//         stage('Trigger GitHub release') {
//           withCredentials([
//             string(credentialsId: 'github-auth-token', variable: 'gitToken')
//           ]) {
//             release.trigger(containerTag, repoName, containerTag, gitToken)
//           }
//         }

//         stage('Trigger Deployment') {
//           withCredentials([
//             string(credentialsId: "$repoName-deploy-token", variable: 'jenkinsToken')
//           ]) {
//             deploy.trigger(JENKINS_DEPLOY_SITE_ROOT, repoName, jenkinsToken, ['chartVersion': containerTag, 'environment': config.environment])
//           }
//         }
//       }

//       if (mergedPrNo != '') {
//         stage('Remove merged PR') {
//           helm.undeployChart(config.environment, repoName, mergedPrNo)
//         }
//       }

//       if (config.containsKey("deployClosure")) {
//         config["deployClosure"]()
//       }

//       stage('Set GitHub status as success'){
//         build.setGithubStatusSuccess()
//       }
//     } catch(e) {
//       stage('Set GitHub status as fail') {
//         build.setGithubStatusFailure(e.message)
//       }

//       stage('Send build failure slack notification') {
//         notifySlack.buildFailure(e.message, "#generalbuildfailures")
//       }

//       if (config.containsKey("failureClosure")) {
//         config["failureClosure"]()
//       }

//       throw e
//     } finally {
//       stage('Clean up test output') {
//         test.deleteOutput('defradigital/node-development', containerSrcFolder)
//       }

//       if (config.containsKey("finallyClosure")) {
//         config["finallyClosure"]()
//       }
//     }
//   }
// }


// @Library('defra-library@0.0.8')
// import uk.gov.defra.ffc.DefraUtils
// def defraUtils = new DefraUtils()

// def registry = '562955126301.dkr.ecr.eu-west-2.amazonaws.com'
// def regCredsId = 'ecr:eu-west-2:ecr-user'
// def kubeCredsId = 'FFCLDNEKSAWSS001_KUBECONFIG'
// def ingressServer = 'ffc.aws-int.defra.cloud'
// def imageName = 'ffc-ce-web'
// def repoName = 'ffc-ce-web'
// def pr = ''
// def mergedPrNo = ''

// def containerTag = ''
// def sonarQubeEnv = 'SonarQube'
// def sonarScanner = 'SonarScanner'
// def containerSrcFolder = '\\/usr\\/src\\/app'
// def localSrcFolder = '.'
// def lcovFile = './test-output/lcov.info'
// def timeoutInMinutes = 5

// def getExtraCommands(pr, containerTag, ingressServer) {
//   withCredentials([
//       string(credentialsId: 'albTags', variable: 'albTags'),
//       string(credentialsId: 'albSecurityGroups', variable: 'albSecurityGroups'),
//       string(credentialsId: 'albArn', variable: 'albArn'),
//       string(credentialsId: 'ffc-ce-web-cookie-password', variable: 'cookiePassword'),
//     ]) {

//     def helmValues = [
//       /container.redeployOnChange="$pr-$BUILD_NUMBER"/,
//       /container.cookiePassword="$cookiePassword"/,
//       /ingress.alb.tags="$albTags"/,
//       /ingress.alb.arn="$albArn"/,
//       /ingress.alb.securityGroups="$albSecurityGroups"/,
//       /ingress.endPoint="ffc-ce-web-$containerTag"/,
//       /ingress.server="$ingressServer"/
//     ].join(',')

//     return [
//       "--values ./helm/ffc-ce-web/jenkins-aws.yaml",
//       "--set $helmValues"
//     ].join(' ')
//   }
// }

// node {
//   checkout scm
//   try {
//     stage('Set PR, and containerTag variables') {
//       (pr, containerTag, mergedPrNo) = defraUtils.getVariables(repoName)
//       defraUtils.setGithubStatusPending()
//     }
//     stage('Helm lint') {
//       defraUtils.lintHelm(imageName)
//     }
//     stage('Build test image') {
//       defraUtils.buildTestImage(imageName, BUILD_NUMBER)
//     }
//     stage('Run tests') {
//       defraUtils.runTests(imageName, BUILD_NUMBER)
//     }
//     stage('Fix absolute paths in lcov file') {
//       defraUtils.replaceInFile(containerSrcFolder, localSrcFolder, lcovFile)
//     }
//     stage('SonarQube analysis') {
//       defraUtils.analyseCode(sonarQubeEnv, sonarScanner, ['sonar.projectKey' : repoName, 'sonar.sources' : '.'])
//     }
//     stage("Code quality gate") {
//       defraUtils.waitForQualityGateResult(timeoutInMinutes)
//     }
//     stage('Push container image') {
//       defraUtils.buildAndPushContainerImage(regCredsId, registry, imageName, containerTag)
//     }
//     if (pr != '') {
//       stage('Helm install') {
//           defraUtils.deployChart(kubeCredsId, registry, imageName, containerTag, getExtraCommands(pr, containerTag, ingressServer))
//           echo "Build available for review at https://ffc-ce-web-$containerTag.$ingressServer"
//       }

//     }
//     if (pr == '') {
//       stage('Publish chart') {
//         defraUtils.publishChart(registry, imageName, containerTag)
//       }
//       stage('Trigger Deployment') {
//         withCredentials([
//           string(credentialsId: 'JenkinsDeployUrl', variable: 'jenkinsDeployUrl'),
//           string(credentialsId: 'ffc-ce-web-deploy-token', variable: 'jenkinsToken')
//         ]) {
//           defraUtils.triggerDeploy(jenkinsDeployUrl, 'FCEP/job/ffc-ce-web-deploy', jenkinsToken, ['chartVersion':'1.0.0'])
//         }
//       }
//     }
//     if (mergedPrNo != '') {
//       stage('Remove merged PR') {
//         defraUtils.undeployChart(kubeCredsId, imageName, mergedPrNo)
//       }
//     }
//     defraUtils.setGithubStatusSuccess()
//   } catch(e) {
//     defraUtils.setGithubStatusFailure(e.message)
//     throw e
//   } finally {
//     defraUtils.deleteTestOutput(imageName)
//   }
// }
