import React from 'react'

const IntroMenu = ({ setPage, setCurrentPage }) => {
    return (
        <nav className="intro-nav">
            <button
                onClick={() => {
                    setCurrentPage(0)
                    setPage('portfolio')
                }}
            >
                ABOUT ME
            </button>

            <button
                onClick={() => {
                    setCurrentPage(1)
                    setPage('portfolio')
                }}
            >
                PROJECT
            </button>

            <button
                onClick={() => {
                    setCurrentPage(8)
                    setPage('portfolio')
                }}
            >
                CONTACT
            </button>
        </nav>
    )
}

export default IntroMenu
