import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const Comments = () => {
    const [comment,setComment] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!comment) {
            alert('Field cannot be empty!')
            return
        }

       const res = await fetch('/api/comments', {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json'
            },
           body: JSON.stringify(comment)
       })
       
       const data = await res.json()
       console.log(data)
       setComment('')
    }
    return (
        <div className='comment'>
            <form onSubmit={handleSubmit}>
                <textarea type="text" value={comment} onChange={(e) => setComment(e.target.value)} disabled />
                {comment ?
                <button type="submit">Submit</button>
                : <button type="submit" disabled>Submit</button> }
            </form>
        </div>
    )
}

export default Comments