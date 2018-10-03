'use strict'

const mysql = require('mysql2')
const config = require('config')

let conn
const init = () => {
    const pool = mysql.createPool({
        host: config.dataSource.qywxAuth.host,
        user: config.dataSource.qywxAuth.username,
        password: config.dataSource.qywxAuth.password,
        database: config.dataSource.qywxAuth.database
    })
    conn = pool.promise()
    return conn
}
const close = () => {
    conn.end()
}

module.exports.init = init
module.exports.close = close