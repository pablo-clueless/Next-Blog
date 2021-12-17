import React from 'react'
import { useState } from 'react'

const Comments = () => {
    const [comment,setComment] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!comment) {
            alert('Field cannot be empty!')
            return
        }

       const res = await fetch('https://pablos-blog-backend.herokuapp.com//api/comments', {
           method: 'POST',
           body: JSON.stringify({
               text: comment})
       })
       
       const data = res.json()
       setComment('')
    }

    return (
        <div className='comment'>
            <form onSubmit={handleSubmit}>
                <textarea type="text" value={comment} onChange={(e) => setComment(e.target.value)} disabled/>
                {comment ?
                <button type="submit">Submit</button>
                : <button type="submit" disabled>Submit</button> }
            </form>
        </div>
    )
}

export default Comments