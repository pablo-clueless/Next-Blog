const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const comments = require('../../data/comments.json')

// export default async function handler(req, res) {
//     if(req.method === 'GET') {
//         const comments = await fs.readFile(path.join(__dirname, '../data/comments.json'))
//         return res.status(200).json(comments)
//     }
// }

export default function handler(req, res) {
    if(req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(comments))
    } else if (req.method === 'POST') {
        const { comment } = req.body

        const newComment = {
            id: uuidv4(),
            text: comment
        }

        comments.push(newComment)
        res.writeHead(200, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify(newComment))
    }
}