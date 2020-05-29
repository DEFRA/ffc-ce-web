@Library('defra-library@v-6') _

// buildNodeJs environment: 'dev'

def config = [environment: 'dev']

  def containerSrcFolder = '\\/home\\/node'
  def localSrcFolder = '.'
  def lcovFile = './test-output/lcov.info'
  def repoName = ''
  def pr = ''
  def identityTag = ''
  def mergedPrNo = ''


    checkout scm
    try {
      stage('Set GitHub status as pending') {
        build.setGithubStatusPending()
      }

      stage('Set PR, and identityTag variables') {
        (repoName, pr, identityTag, mergedPrNo) = build.getVariables(version.getPackageJsonVersion())
      }

      if (pr != '') {
        stage('Verify version incremented') {
          version.verifyPackageJsonIncremented()
        }
      }

      if (config.containsKey('validateClosure')) {
        config['validateClosure']()
      }

      stage('Helm lint') {
        test.lintHelm(repoName)
      }

      stage('Build test image') {
        build.buildTestImage(DOCKER_REGISTRY_CREDENTIALS_ID, DOCKER_REGISTRY, repoName, BUILD_NUMBER, identityTag)
      }

      if (config.containsKey('buildClosure')) {
        config['buildClosure']()
      }

      stage('Run tests') {
        build.runTests(repoName, repoName, BUILD_NUMBER, identityTag)
      }

      stage('Create JUnit report') {
        test.createJUnitReport()
      }

      stage('Fix lcov report') {
        utils.replaceInFile(containerSrcFolder, localSrcFolder, lcovFile)
      }

      if (config.containsKey('testClosure')) {
        config['testClosure']()
      }

      pr = ''
      identityTag = "1.0.5"

      stage('Push container image') {
        build.buildAndPushContainerImage(DOCKER_REGISTRY_CREDENTIALS_ID, DOCKER_REGISTRY, repoName, identityTag)
      }

      if (pr != '') {
        stage('Helm install') {
          helm.deployChart(config.environment, DOCKER_REGISTRY, repoName, identityTag)
        }
      }
      else {
        stage('Publish chart') {
          helm.publishChart(DOCKER_REGISTRY, repoName, identityTag, HELM_CHART_REPO_TYPE)
        }

        stage('Trigger GitHub release') {
          withCredentials([
            string(credentialsId: 'github-auth-token', variable: 'gitToken')
          ]) {
            release.trigger(identityTag, repoName, identityTag, gitToken)
          }
        }

        stage('Trigger Deployment') {
          withCredentials([
            string(credentialsId: "$repoName-deploy-token", variable: 'jenkinsToken')
          ]) {
            deploy.trigger(JENKINS_DEPLOY_SITE_ROOT, repoName, jenkinsToken, ['chartVersion': identityTag, 'environment': config.environment, 'helmChartRepoType': HELM_CHART_REPO_TYPE])
          }
        }
      }

      if (config.containsKey('deployClosure')) {
        config['deployClosure']()
      }

      stage('Set GitHub status as success'){
        build.setGithubStatusSuccess()
      }
    } catch(e) {
      stage('Set GitHub status as fail') {
        build.setGithubStatusFailure(e.message)
      }

      stage('Send build failure slack notification') {
        notifySlack.buildFailure(e.message, '#generalbuildfailures')
      }

      if (config.containsKey('failureClosure')) {
        config['failureClosure']()
      }

      throw e
    } finally {
      stage('Clean up test output') {
        test.deleteOutput('defradigital/node-development', containerSrcFolder)
      }

      if (config.containsKey('finallyClosure')) {
        config['finallyClosure']()
      }
    }
  }

