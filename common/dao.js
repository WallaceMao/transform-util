'use strict'

const sourceDb = require('./sourceDb')

const sourceConn = sourceDb.init()
let targetTag = null
let targetConn = null

const init = (tag, conn) => {
    targetTag = tag
    targetConn = conn
}

/**
 * 从sourceDb中的transform_oauth中查找最大的id值
 * @returns {maxId: Long}
 */
const querySourceMaxId = async () => {
    if(!targetTag || !targetConn){
        throw new Error(`targetTag or targetConn not found: ${targetTag}, ${targetConn}`)
    }
    const SQL = 'select max(t.id) as maxId from transform_oauth t where t.type = ?'
    const [rows, fields] = await sourceConn.execute(SQL, [targetTag])
    if(!rows || rows.length < 1){
        throw new Error(`querySourceMaxId result not found, result: ${rows}, sql: ${SQL}`)
    }
    return rows[0]
}

/**
 * 从sourceDb中的transform_oauth查找指定id的记录
 * @param {*} id 
 */
const querySourceQueue = async (id) => {
    if(!targetTag || !targetConn){
        throw new Error(`targetTag or targetConn not found: ${targetTag}, ${targetConn}`)
    }
    const SQL = 'select t.id as queueId, u.id as rsqUserId, t.outer_id as outerId, u.username as rsqLoginToken from transform_oauth t left join user u on t.user_id=u.id where t.type = ? and t.id = ?'
    const [rows, fields] = await sourceConn.execute(SQL, [targetTag, id])
    if(!rows || rows.length < 1){
        throw new Error(`querySourceQueue result not found, result: ${rows}, sql: ${SQL}, params: ${id}`)
    }
    return rows[0]
}

/**
 * 从tagetConn中的transform_config中查找配置信息
 * @returns {isOn: Bit, checkStartId: Long, checkEndId: Long}
 */
const queryTargetConfig = async () => {
    if(!targetTag || !targetConn){
        throw new Error(`targetTag or targetConn not found: ${targetTag}, ${targetConn}`)
    }
    const SQL = 'select t.is_on as isOn, t.check_start_id as checkStartId, t.check_end_id as checkEndId from transform_config t limit 1'
    const [rows, fields] = await targetConn.execute(SQL)
    if(!rows || rows.length < 1){
        throw new Error(`queryTargetConfig result not found, result: ${rows}, sql: ${SQL}`)
    }
    return rows[0]
}

/**
 * 更新targetConn中transform_config中的信息
 * @param {rsqUserId: Long, rsqLoginToken: String, corpId: String, userId: String} oauth 
 */
const updateTargetStaff = async (oauth) => {
    if(!targetTag || !targetConn){
        throw new Error(`targetTag or targetConn not found: ${targetTag}, ${targetConn}`)
    }
    const SQL = 'update isv_corp_staff t set t.rsq_user_id=${oauth.rsqUserId}, t.rsq_login_token=${oauth.rsqLoginToken}` where t.corp_id=${oauth.corpId} and t.user_id=${oauth.userId}'
    const [rows, fields] = await targetConn.execute(SQL, [oauth.rsqUserId, oauth.rsqLoginToken, oauth.corpId, oauth.userId])
    if(!rows || rows.length < 1){
        throw new Error(`updateTargetStaff update no rows, result: ${rows}, sql: ${SQL}, params: ${JSON.stringify(oauth)}}`)
    }
    return rows[0]
}

/**
 * 更新targetConn中的isv_corp_staff中的信息
 * @param {*} queueId 
 */
const updateTargetConfig = async (queueId) => {
    if(!targetTag || !targetConn){
        throw new Error(`targetTag or targetConn not found: ${targetTag}, ${targetConn}`)
    }
    const SQL = 'update transform_config t set t.check_start_id=? + 1'
    const [rows, fields] = await targetConn.execute(SQL, [queueId])
    if(!rows || rows.length < 1){
        throw new Error(`updateTargetConfig update no rows, result: ${rows}, sql: ${SQL}, params: ${queueId}}`)
    }
    return rows[0]
}

module.exports.init = init
module.exports.querySourceMaxId = querySourceMaxId
module.exports.querySourceQueue = querySourceQueue
module.exports.queryTargetConfig = queryTargetConfig
module.exports.updateTargetStaff = updateTargetStaff
module.exports.updateTargetConfig = updateTargetConfig



