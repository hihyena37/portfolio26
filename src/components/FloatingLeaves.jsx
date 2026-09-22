import React from 'react'
import './FloatingLeaves.css'

import leaf1 from '../assets/leaf1.png'
import leaf2 from '../assets/leaf2.png'

const leaves = [
  {
    id: 1,
    image: leaf1,
    left: '8%',
    delay: '-6s',
    duration: '17s',
    size: '38px',
    drift: '-80px',
    rotate: '180deg',
  },
  {
    id: 2,
    image: leaf2,
    left: '24%',
    delay: '-12s',
    duration: '21s',
    size: '32px',
    drift: '90px',
    rotate: '240deg',
  },
  {
    id: 3,
    image: leaf1,
    left: '43%',
    delay: '-9s',
    duration: '19s',
    size: '46px',
    drift: '-120px',
    rotate: '210deg',
  },
  {
    id: 4,
    image: leaf2,
    left: '62%',
    delay: '-17s',
    duration: '23s',
    size: '30px',
    drift: '70px',
    rotate: '260deg',
  },
  {
    id: 5,
    image: leaf1,
    left: '79%',
    delay: '-7s',
    duration: '20s',
    size: '42px',
    drift: '-90px',
    rotate: '200deg',
  },
  {
    id: 6,
    image: leaf2,
    left: '92%',
    delay: '-14s',
    duration: '22s',
    size: '34px',
    drift: '100px',
    rotate: '230deg',
  },
]

const FloatingLeaves = () => {
  return (
    <div className="floating-leaves">
      {leaves.map((item) => (
        <img
          key={item.id}
          src={item.image}
          alt=""
          className="floating-leaf"
          style={{
            left: item.left,
            width: item.size,
            animationDelay: item.delay,
            animationDuration: item.duration,
            '--leaf-drift': item.drift,
            '--leaf-rotate': item.rotate,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingLeaves