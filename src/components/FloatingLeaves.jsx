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
  {
    id: 7,
    image: leaf2,
    left: '15%',
    delay: '-2s',
    duration: '20s',
    size: '34px',
    drift: '75px',
    rotate: '220deg',
  },
  {
    id: 8,
    image: leaf1,
    left: '33%',
    delay: '-16s',
    duration: '22s',
    size: '40px',
    drift: '-95px',
    rotate: '190deg',
  },
  {
    id: 9,
    image: leaf2,
    left: '51%',
    delay: '-5s',
    duration: '18s',
    size: '30px',
    drift: '85px',
    rotate: '250deg',
  },
  {
    id: 10,
    image: leaf1,
    left: '70%',
    delay: '-11s',
    duration: '21s',
    size: '44px',
    drift: '-110px',
    rotate: '210deg',
  },
  {
    id: 11,
    image: leaf2,
    left: '85%',
    delay: '-19s',
    duration: '24s',
    size: '32px',
    drift: '60px',
    rotate: '240deg',
  },
  {
    id: 12,
    image: leaf1,
    left: '4%',
    delay: '-13s',
    duration: '19s',
    size: '36px',
    drift: '100px',
    rotate: '200deg',
  },
  { id: 13, image: leaf1, left: '11%', delay: '-10s', duration: '23s', size: '40px', drift: '65px', rotate: '220deg' },
  { id: 14, image: leaf2, left: '21%', delay: '-4s', duration: '19s', size: '31px', drift: '-70px', rotate: '250deg' },
  { id: 15, image: leaf1, left: '38%', delay: '-18s', duration: '24s', size: '43px', drift: '95px', rotate: '190deg' },
  { id: 16, image: leaf2, left: '47%', delay: '-3s', duration: '21s', size: '35px', drift: '-85px', rotate: '230deg' },
  { id: 17, image: leaf1, left: '57%', delay: '-15s', duration: '20s', size: '38px', drift: '110px', rotate: '210deg' },
  { id: 18, image: leaf2, left: '66%', delay: '-8s', duration: '22s', size: '30px', drift: '-60px', rotate: '260deg' },
  { id: 19, image: leaf1, left: '75%', delay: '-20s', duration: '25s', size: '45px', drift: '80px', rotate: '200deg' },
  { id: 20, image: leaf2, left: '96%', delay: '-6s', duration: '18s', size: '33px', drift: '-100px', rotate: '240deg' },
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
