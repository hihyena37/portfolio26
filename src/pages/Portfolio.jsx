import React from 'react'
import Header from '../components/Header'
import Book from '../components/Book'

const Portfolio = ({ setPage, currentPage, setCurrentPage }) => {
    return (
        <div>
            <Header
                setPage={setPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} />

            <Book
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default Portfolio
