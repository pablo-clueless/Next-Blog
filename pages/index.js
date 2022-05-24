import { useState } from 'react'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Post from '../comps/Post'

export default function Home({posts}) {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState([])

    const handleSearch = (e) => {
      setQuery(e.target.value)
      
      const slugs = posts.map(post => { return post.slug })
      const result = slugs.find(slug => slug.includes(query))
      console.log(result)
    }

  return (
    <>
    <Head>
      <title> Pablo&apos;s Blog | Home</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
    </Head>
    <form className='form'>
      <input disabled type='text' value={query} onChange={handleSearch} onFocus={() => setIsSearching(true)} onBlur={() => setIsSearching(false)} placeholder='Search...' />
    </form>
    {isSearching ?
    <div className='search-result'>
      Searching...
    </div> :
    <div className="posts">
      {posts.map(post => (
        <Post post={post} key={post.slug}/>
      ))}
    </div>}
    <footer></footer>
    </>
  )
}


export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(file => {
     const slug = file.replace('.md', '')

     const markdownWithMeta = fs.readFileSync(path.join('posts',file), 'utf-8')

     const { data: frontmatter } = matter(markdownWithMeta)

     return {
       slug,
       frontmatter
     }
  })

  return {
    props : {
      posts
    }
  }
}