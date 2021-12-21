import Link from 'next/link'
import Image from 'next/image'

const Post = ({post}) => {
    return (
        <div className='card'>
            <Image src={post.frontmatter.cover_image} alt={post.title} width={350} height={200} />
            <div className="post-date">{post.frontmatter.author} | {post.frontmatter.date}</div>
            <h3>{post.frontmatter.title}</h3>
            <p>{post.frontmatter.excerpts}</p>
            <Link href={`/blog/${post.slug}`}>
                <a className="btn">Read more</a>
            </Link>
        </div>
    );
}

export default Post