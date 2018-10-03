'use strict'

const mysql = require('mysql2')
const config = require('config')

let conn
const init = () => {
    const pool = mysql.createPool({
        host: config.dataSource.rishiqingNew.host,
        user: config.dataSource.rishiqingNew.username,
        password: config.dataSource.rishiqingNew.password,
        database: config.dataSource.rishiqingNew.database
    })
    conn = pool.promise()
    return conn
}
const close = () => {
    conn.end()
}

module.exports.init = init
module.exports.close = close