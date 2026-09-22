import React from 'react'
import IntroMenu from '../components/IntroMenu'

const Intro = ({ setPage, setCurrentPage }) => {
    return (
        <main>
            <h1>WEB PORTFOLIO</h1>

            <IntroMenu
                setPage={setPage}
                setCurrentPage={setCurrentPage}
            />
        </main>
    )
}

export default Intro
