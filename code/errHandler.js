const colors = require('colors')

module.exports = {
    showError(root,err){
        console.log(colors.bgRed(colors.bold(root)) + '----->' + colors.red(err))
    }
}
