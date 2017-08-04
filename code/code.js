const colors = require('colors')

module.exports = {
    error: {
        errcode:'-1',
        errmsg:'500 error'
    },
    err404:{
        errcode:'-1',
        errmsg:'404 not found'
    },
    showError(root,err){
        console.log(colors.bgRed('error===>('+root+')') +' '+ colors.red(err))
    }
}
