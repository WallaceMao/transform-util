'use strict'

const CronJob = require('cron').CronJob

const transformCheck = require('./transformCheck')

const job = new CronJob('*/5 * * * * *', async () => {
    await transformCheck.check()
})

module.exports = job