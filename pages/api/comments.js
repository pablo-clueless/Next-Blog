let comments = require('../data/comments')

export default function handler (req, res){
    if (req.method === 'GET') {
        res.status(200).json(comments)
    } else if (req.method === 'POST') {
        const comment = req.body.comment
        const id = req.body.id
        const newComment = {
            id,
            comment
        }
        comments.push(newComment)
        res.status(201).json(newComment)
    }
}
