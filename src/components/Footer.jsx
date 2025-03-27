import React from 'react'

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full px-4 py-2 border-t flex flex-col items-center justify-center md:gap-2 md:flex-row bg-black">
            <span className="text-sm sm:text-center cursor-default">
                <a href="https://github.com/cescosgames" target='_blank' className='transition hover:text-vintage-white' aria-label='link to github profile'>2025 Made by Cesco</a>
            </span>
            <ul className="hidden items-center text-sm font-medium text-vintage-tan sm:mt-0 md:block hover:text-vintage-white transition">
                <li>
                    <a href="#" target='_blank' className="me-4 md:me-6 cursor-pointer" aria-label='link to github project'>Github</a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer