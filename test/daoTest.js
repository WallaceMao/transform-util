global.logger = require('../config/logConfig').commonLogger

const dao = require('../common/dao')
const dingtalkDb = require('../dingtalk/targetDb')

const dingtalkConn = dingtalkDb.init()

dao.init('dingtalk', dingtalkConn)

const dingtalkDaoTest = async () => {
    const config = await dao.queryTargetConfig()
    console.log(JSON.stringify(config))
    if(config.isOn){
        console.log('isOn')
    }else{
        console.log('is not On')
    }
}

const transformCheckTest = async () => {
    const transformCheck = require('../dingtalk/transformCheck')
    transformCheck.check()
}

transformCheckTest()