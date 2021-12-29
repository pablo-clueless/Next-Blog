import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Post from '../comps/Post'

export default function Home({posts}) {

  return (
    <>
    <Head>
      <title> Pablo&apos;s Blog | Home</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
    </Head>
    <div className="posts">
      {posts.map((post, i) => (
        <Post post={post} key={i}/>
      ))}
    </div>
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