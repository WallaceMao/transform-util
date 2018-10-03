'use strict'

const mysql = require('mysql2')
const config = require('config')

let conn
const init = () => {
    const pool = mysql.createPool({
        host: config.dataSource.dingtalkAuth.host,
        user: config.dataSource.dingtalkAuth.username,
        password: config.dataSource.dingtalkAuth.password,
        database: config.dataSource.dingtalkAuth.database
    })
    conn = pool.promise()
    return conn
}
const close = () => {
    conn.end()
}

module.exports.init = init
module.exports.close = close