import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Post from '../comps/Post'

export default function Home({posts}) {

  return (
    <>
    <Head>
      <title>Blog | Home</title>
    </Head>
    <div className="posts">
      {posts.map((post, i) => (
        <Post post={post} />
      ))}
    </div>
    </>
  )
}


//this functions fetch data from public dir
export const getStaticProps = async () => {
  //get files from the post dir
  const files = fs.readdirSync(path.join('posts'))

  //get slug and front matter from post
  const posts = files.map(file => {
     //create slug
     const slug = file.replace('.md', '')

     //get frontmatter
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