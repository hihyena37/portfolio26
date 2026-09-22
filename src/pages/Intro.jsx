import React from 'react'

import IntroMenu from '../components/IntroMenu'
import introBg from '../assets/intro-bg.gif'

import './Intro.css'

const Intro = ({ setPage, setCurrentPage }) => {
    return (
        <main
            className="intro"
            style={{
                backgroundImage: `url(${introBg})`
            }}
        >
            <IntroMenu
                setPage={setPage}
                setCurrentPage={setCurrentPage}
            />
        </main>
    )
}

export default Intro