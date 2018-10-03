'use strict'

const main = () => {
    let sourceDb
    let targetDb
    try {
        global.logger = require('./config/logConfig').commonLogger
        const partyName = process.argv[2]
    
        if(!partyName){
            global.logger.error(`party not found! dingtalk or qywx ?`)
            process.exit(1)
        }
        
        const job = require(`./${partyName}/job`)
        // sourceDb = require('./common/sourceDb')
        // targetDb = require(`./${partyName}/targetDb`)
        
        job.start()
    }catch(err){
        console.error(err.stack)
        // if(sourceDb){
        //     sourceDb.close()
        // }
        // if(targetDb){
        //     targetDb.close()
        // }
    }
}

main()