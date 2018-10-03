// for pm2

module.exports = {
    apps : [
        {
          name: "transform-job",
          script: "./index.js",
          watch: true,
          env_qywx: {
            "PARTY_NAME": "qywx",
            "NODE_ENV": "production"
          },
          env_dingtalk: {
              "PARTY_NAME": "dingtalk",
              "NODE_ENV": "production"
          }
        }
    ]
  }