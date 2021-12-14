const { rejects } = require('assert')
const req = require('express/lib/request')
const fs = require('fs')
const { resolve } = require('path')

const writeDataToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
        if(err) {
            alert("Error, couldn't save comment")
        }
    })
}

const getPostData = req => {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports ={
    writeDataToFile,
    getPostData
}