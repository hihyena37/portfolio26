import React from 'react'
import IntroMenu from '../components/IntroMenu'

const Intro = ({ setPage, setCurrentPage }) => {
    return (
        <main>
            <IntroMenu
                setPage={setPage}
                setCurrentPage={setCurrentPage}
            />
        </main>
    )
}

export default Intro
