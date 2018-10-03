// for pm2

module.exports = {
    apps : [
        {
          name: "transform-job",
          script: "./index.js",
          watch: true,
          env: {
              "NODE_ENV": "production"
          },
          env_beta: {
              "NODE_ENV": "beta",
          }
        }
    ]
  }