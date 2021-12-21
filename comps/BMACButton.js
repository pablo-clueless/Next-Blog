import Link from 'next/link'

const BMACButton = () => {
    return (
        <Link href='https://www.buymeacoffee.com/pablo_clueless' passHref>
            <a className='buyButton' target='_blank' rel='noreferrer' >
                <img className='coffeeImage' src='https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg' alt='Buy me a coffee'/>
                <span className='coffeeButtonText'>Buy me a coffee</span>
            </a>
        </Link>
    )
}

export default BMACButton