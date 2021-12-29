import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Markdown from 'marked-react'
// import BMACWidget from '../../comps/BMACWidget'
import BMACButton from '../../comps/BMACButton'

const PostPage = ({ frontmatter: { title, date, cover_image, author, author_contact}, slug, content}) => {
 
    return (
        <>
        <Head>
            <title>Pablos&apos;Blog | {title}</title>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <Link href='/'>
            <a className="btn btn-back">Go Back</a>
        </Link>
        <div className="card-page">
            <h1 className="post-title">{title}</h1>
            <div className="flex post-date">
                <h3>{author}</h3>
                <p>Posted on {date}</p>
            </div>
            <Image src={cover_image} alt={title} width={800} height={400} layout='responsive' />
            <div className="post-body">
                <Markdown>{content}</Markdown>
            </div>
        </div>
        <BMACButton />
        {/* <BMACWidget /> */}
        </>
    )
}

export const getStaticPaths = async () => {
    const files = fs.readdirSync(path.join('posts'))

    const paths = files.map(file => ({
        params: {
            slug: file.replace('.md', '')
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ( {params: { slug } } ) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')

    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content
        }
    }
}

export default PostPage