'use strict'

const targetDb = require('./targetDb')
const checkService = require('../common/checkService')

const TAG_NAME = 'dingtalk'

const targetConn = targetDb.init()

checkService.init(TAG_NAME, targetConn)

const check = async () => {
    try {
        return await checkService.check()
    } catch (error) {
        global.logger.error(error.stack)
    }
}

module.exports.check = check