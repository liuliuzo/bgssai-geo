@Library('bgssai') _

pipeline {
  agent any

  options {
    skipDefaultCheckout()
    disableConcurrentBuilds()
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '30'))
    timeout(time: 60, unit: 'MINUTES')
  }

  stages {
    stage('Resolve environment') {
      steps {
        script {
          env.BGSSAI_ENV = bgssaiResolveEnvironment(action: '部署', requireConfirm: false)
        }
      }
    }

    stage('Deploy') {
      steps {
        bgssaiDeployNodeService(
          product: 'geo',
          environment: env.BGSSAI_ENV,
          nodeEntry: 'server/index.mjs',
          packageManager: 'npm',
          workspaceFilter: '',
          buildScript: 'build',
          migrateCmd: '',
          appPort: '8080',
          healthPath: '/bgssai/health/readiness',
        )
      }
    }
  }

  post {
    success {
      echo "部署成功: bgssai-geo environment=${env.BGSSAI_ENV}"
    }
    failure {
      echo "部署失败: bgssai-geo environment=${env.BGSSAI_ENV}"
    }
  }
}
