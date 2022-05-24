import Link from 'next/link'
import Image from 'next/image'

const Post = ({post}) => {
    return (
        <div className='card'>
            <div>
                <Image src={post.frontmatter.cover_image} alt={post.title} width={350} height={200} />
                <div className="post-date">
                    <p>{post.frontmatter.author}</p>
                    <p>{post.frontmatter.date}</p>
                </div>
            </div>
            <div>
                <h2>{post.frontmatter.title}</h2>
                <p>{post.frontmatter.excerpts}</p>
                <Link href={`/blog/${post.slug}`}>
                    <a className="btn">Read more</a>
                </Link>
            </div>
        </div>
    );
}

export default Post