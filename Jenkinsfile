@Library('defra-library@0.0.8')
import uk.gov.defra.ffc.DefraUtils
def defraUtils = new DefraUtils()

def registry = '562955126301.dkr.ecr.eu-west-2.amazonaws.com'
def regCredsId = 'ecr:eu-west-2:ecr-user'
def kubeCredsId = 'FFCLDNEKSAWSS001_KUBECONFIG'
def ingressServer = 'ffc.aws-int.defra.cloud'
def imageName = 'ffc-ce-web'
def repoName = 'ffc-ce-web'
def pr = ''
def mergedPrNo = ''

def containerTag = ''
def sonarQubeEnv = 'SonarQube'
def sonarScanner = 'SonarScanner'
def containerSrcFolder = '\\/usr\\/src\\/app'
def localSrcFolder = '.'
def lcovFile = './test-output/lcov.info'
def timeoutInMinutes = 5

def getExtraCommands(pr, containerTag, ingressServer) {
  withCredentials([
      string(credentialsId: 'albTags', variable: 'albTags'),
      string(credentialsId: 'albSecurityGroups', variable: 'albSecurityGroups'),
      string(credentialsId: 'albArn', variable: 'albArn'),
      string(credentialsId: 'ffc-ce-web-cookie-password', variable: 'cookiePassword'),
    ]) {

    def helmValues = [
      /container.redeployOnChange="$pr-$BUILD_NUMBER"/,
      /container.cookiePassword="$cookiePassword"/,
      /ingress.alb.tags="$albTags"/,
      /ingress.alb.arn="$albArn"/,
      /ingress.alb.securityGroups="$albSecurityGroups"/,
      /ingress.endpoint="ffc-ce-web-$containerTag"/,
      /ingress.endpoint="ffc-ce-web"/,
      /ingress.server="$ingressServer"/
    ].join(',')

    return [
      "--values ./helm/ffc-ce-web/jenkins-aws.yaml",
      "--set $helmValues"
    ].join(' ')
  }
}

node {
  checkout scm
  try {
    stage('Set PR, and containerTag variables') {
      (pr, containerTag, mergedPrNo) = defraUtils.getVariables(repoName)
      defraUtils.setGithubStatusPending()
    }    
    stage('Helm lint') {
      defraUtils.lintHelm(imageName)
    }
    stage('Build test image') {
      defraUtils.buildTestImage(imageName, BUILD_NUMBER)
    }
    stage('Run tests') {
      defraUtils.runTests(imageName, BUILD_NUMBER)
    }
    stage('Fix absolute paths in lcov file') {
      defraUtils.replaceInFile(containerSrcFolder, localSrcFolder, lcovFile)
    }
    stage('SonarQube analysis') {
      defraUtils.analyseCode(sonarQubeEnv, sonarScanner, ['sonar.projectKey' : repoName, 'sonar.sources' : '.'])
    }
    stage("Code quality gate") {
      defraUtils.waitForQualityGateResult(timeoutInMinutes)
    }
    stage('Push container image') {
      defraUtils.buildAndPushContainerImage(regCredsId, registry, imageName, containerTag)
    }
    if (pr != '') {
      stage('Helm install') {
          defraUtils.deployChart(kubeCredsId, registry, imageName, containerTag, getExtraCommands(pr, containerTag, ingressServer))
          echo "Build available for review at https://ffc-ce-web-$containerTag.$ingressServer"
      }
      
    }
    if (pr == '') {
      stage('Publish chart') {
        defraUtils.publishChart(registry, imageName, containerTag)
      }
      stage('Trigger Deployment') {
        withCredentials([
          string(credentialsId: 'JenkinsDeployUrl', variable: 'jenkinsDeployUrl'),
          string(credentialsId: 'ffc-ce-web-deploy-token', variable: 'jenkinsToken')
        ]) {
          defraUtils.triggerDeploy(jenkinsDeployUrl, 'ffc-ce-web-deploy', jenkinsToken, ['chartVersion':'1.0.0'])
        }
      }
    }
    if (mergedPrNo != '') {
      stage('Remove merged PR') {
        defraUtils.undeployChart(kubeCredsId, imageName, mergedPrNo)
      }
    }
    defraUtils.setGithubStatusSuccess()
  } catch(e) {
    defraUtils.setGithubStatusFailure(e.message)
    throw e
  } finally {
    defraUtils.deleteTestOutput(imageName)
  }
}
