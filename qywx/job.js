'use strict'

const CronJob = require('cron').CronJob

const transformCheck = require('./transformCheck')

const job = new CronJob('*/30 * * * * *', async () => {
    await transformCheck.check()
})

module.exports = job