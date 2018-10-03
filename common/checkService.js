'use strict'

const dao = require('./dao')

const init = (tag, conn) => {
    dao.init(tag, conn)
}

const check = async () => {
    const config = await dao.queryTargetConfig()
    if(!config.isOn){
        global.logger.warn(`job is off!`)
        return
    }

    const maxObj = await dao.querySourceMaxId()
    const startId = config.checkStartId
    const endId = Math.min(config.checkEndId, maxObj.maxId)

    global.logger.info(`begin to check: config: ${JSON.stringify(config)}, startId: ${startId}, endId: ${endId}`)
    for(let indexId = startId; startId <= endId; indeId++){
        const oauth = await dao.querySourceQueue(indexId)
        if(!oauth){
            continue
        }
        const outerArray = oauth.outerId.split('--')
        const corpId = outerArray[0]
        const userId = outerArray[1]
        if(!corpId || !userId){
            global.logger.warn(`corpId or userId not found: corpId: ${corpId}, userId: ${userId}`)
            continue
        }
        await dao.updateTargetStaff({
            corpId: corpId,
            userId: userId,
            rsqUserId: oauth.rsqUserId,
            rsqLoginToken: oauth.rsqLoginToken
        })
        await dao.updateTargetConfig(oauth.queueId)
    }
    global.logger.info(`check end`)
}

module.exports.init = init
module.exports.check = check