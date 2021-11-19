import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'
import Link from 'next/link'

const PostPage = ({ frontmatter: { title, date, cover_image, author, author_contact}, slug, content}) => {
    return (
        <>
        <Link href='/'>Go back &larr;</Link>
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