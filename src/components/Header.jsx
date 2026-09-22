import React from 'react'
import './Header.css'

const Header = ({ setPage, currentPage, setCurrentPage }) => {
    return (
        <header>
            <nav className="portfolio-nav">

                <button onClick={() => setPage('intro')}>
                    INTRO
                </button>

                <button
                    className={currentPage === 0 ? 'active' : ''}
                    onClick={() => setCurrentPage(0)}
                >
                    ABOUT ME
                </button>

                <button
                    className={
                        currentPage >= 1 && currentPage <= 7
                            ? 'active'
                            : ''
                    }
                    onClick={() => setCurrentPage(1)}
                >
                    PROJECT
                </button>

                <button
                    className={currentPage >= 8 ? 'active' : ''}
                    onClick={() => setCurrentPage(8)}
                >
                    CONTACT
                </button>

            </nav>
        </header>
    )
}

export default Header