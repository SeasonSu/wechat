const moment = require('moment')

module.exports = {
    now(){
        return moment().format('YYYY-MM-DD h:mm:ss')
    }
}
