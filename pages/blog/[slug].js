import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Markdown from 'marked-react'
import { useEffect } from 'react'

import BMACButton from '../../comps/BMACButton'


const PostPage = ({ frontmatter: { title, date, cover_image, author, author_contact}, slug, content}) => {
    useEffect(() => {
        const scrollLine = document.getElementById('scroll-line')

        const fillScrollBar = () => {
            const windowHeight = innerHeight
            const fullHeight = document.body.clientHeight
            const scrolled = scrollY
            const percentScrolled = (scrolled/ (fullHeight - windowHeight)) * 100
            scrollLine.style.width = `${percentScrolled}%`
        }

        const debounce = (func, wait = 15, immediate) => {
        var timeout
        return function () {
            var context = this, args = arguments
            var later = function() {
                timeout = null
                if(!immediate) func.apply(context, args)
            }
            var callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if(callNow) func.apply(context, args)
        }
    }
        window.addEventListener('scroll', debounce(fillScrollBar))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
 
    return (
        <>
        <Head>
            <title>Pablos&apos;Blog | {title}</title>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <div id='scroll-line'></div>
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