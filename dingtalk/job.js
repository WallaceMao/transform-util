'use strict'

const CronJob = require('cron').CronJob

const transformCheck = require('./transformCheck')

const job = new CronJob('*/30 * * * * *', async () => {
    const now = new Date()
    // const delay = Math.random() * 20000
    // global.logger.debug(`dingtalk: ${now}, random: ${delay}`)
    // while(new Date().getTime() - now.getTime() < delay){}
    await transformCheck.check()
})

module.exports = job