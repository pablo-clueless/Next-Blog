import Link from 'next/link'
import { FaGithub, FaGlobe, FaTwitter, FaLinkedin, FaGit } from 'react-icons/fa'

const Header = () => {
    return (
        <header>
            <div className="container flex">
                <Link href='/'>Pablo's Blog</Link>
                <ul>
                    <li>
                    <a target='_blank' rel='noopener noreferrer' href='https://okunolasamson.vercel.app'>
                        <FaGlobe />
                    </a>
                    </li>
                    <li>
                        <a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/samson-okunola-76842a169/'>
                            <FaLinkedin />
                        </a>
                    </li>
                    <li>
                        <a target='_blank' rel='noopener noreferrer' href='https://github.com/pablo-clueless'>
                            <FaGithub />
                        </a>
                    </li>
                    <li>
                        <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/pablo_clueless'>
                            <FaTwitter />
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header