const Promise = require('bluebird')
const fs = require('fs')
const colors = require('colors')
module.exports = {
    readFileAsync(filePath, encoding) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, encoding, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        })
    },
    writeFileAsync(filePath, data, encoding) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, data, encoding, err => {
                if (err) reject(err)
                else {
                    resolve();
                    console.log(colors.red(`write into ${filePath} is ok`))
                }
            })
        })
    }
}
