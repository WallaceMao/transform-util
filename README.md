# 新版本日事清的第三方（钉钉、企业微信）迁移程序

## 执行逻辑

第三方：表示钉钉或者企业微信，以下统称第三方

从日事清的后台读取第三方认证信息的outerId，将认证信息更新到第三方的后台，需要更新的信息包括：

- rsqId
- rsqLoginToken


## pm2环境下
`pm2 start pm2.config.js --env qywx`

注意：由于pm2与node-config的环境变量`NODE_APP_INSTANCE`冲突问题，需要在pm2中添加配置`instance_var: 'INSTANCE_ID'`，具体参见`pm2.config.js`文件

## 纯node环境下（容器环境下）
`NODE_CONFIG_DIR=/acs/config NODE_ENV=production node index.js dingtalk`