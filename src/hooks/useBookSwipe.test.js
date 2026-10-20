import assert from 'node:assert/strict'
import test from 'node:test'
import { bindBookSwipe } from './useBookSwipe.js'

function setup() {
  const listeners = new Map()
  const turns = []
  let options = { enabled: true, page: 2, onSwipe: (direction) => turns.push(direction) }
  const root = {
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: (name) => listeners.delete(name),
  }
  const cleanup = bindBookSwipe(root, () => options)
  const touch = (x, y, identifier = 1) => ({ clientX: x, clientY: y, identifier })
  const emit = (name, touches, changedTouches = [], interactive = false) => {
    const event = {
      touches, changedTouches, target: { closest: (selector) => interactive === 'button'
        ? selector.split(',').some((part) => part.trim() === 'button') : interactive }, cancelable: true,
      prevented: false, preventDefault() { this.prevented = true }, stopPropagation() {},
    }
    listeners.get(name)?.(event)
    return event
  }
  return { turns, touch, emit, cleanup, update: (next) => { options = { ...options, ...next } } }
}

test('horizontal swipes survive target/callback changes and turn once in either direction', () => {
  const s = setup()
  s.emit('touchstart', [s.touch(220, 100)])
  s.update({ onSwipe: (direction) => s.turns.push(direction) })
  assert.equal(s.emit('touchmove', [s.touch(130, 110)]).prevented, true)
  s.emit('touchend', [], [s.touch(110, 110)])
  s.emit('touchend', [], [s.touch(110, 110)])
  assert.deepEqual(s.turns, ['next'])
  assert.equal(s.emit('click', []).prevented, true)
  s.emit('touchstart', [s.touch(80, 100)])
  s.emit('touchend', [], [s.touch(180, 105)])
  assert.deepEqual(s.turns, ['next', 'previous'])
  s.cleanup()
})

test('vertical scrolling stays native even if the finger later moves sideways', () => {
  const s = setup()
  s.emit('touchstart', [s.touch(200, 100)])
  assert.equal(s.emit('touchmove', [s.touch(205, 140)]).prevented, false)
  s.emit('touchend', [], [s.touch(60, 145)])
  assert.deepEqual(s.turns, [])
})

test('contents buttons allow swipes in both directions while ordinary taps still click', () => {
  const s = setup()
  for (const endX of [155, 245]) {
    s.emit('touchstart', [s.touch(200, 100)], [], 'button')
    s.emit('touchmove', [s.touch(endX, 120)], [], 'button')
    s.emit('touchend', [], [s.touch(endX, 120)], 'button')
    assert.equal(s.emit('click', [], [], 'button').prevented, true)
  }
  assert.deepEqual(s.turns, ['next', 'previous'])
  s.emit('touchstart', [s.touch(200, 100)], [], 'button')
  s.emit('touchend', [], [s.touch(202, 100)], 'button')
  assert.equal(s.emit('click', [], [], 'button').prevented, false)
  assert.equal(s.turns.length, 2)
})

test('an initially diagonal gesture can resolve into a horizontal swipe', () => {
  const s = setup()
  s.emit('touchstart', [s.touch(200, 100)])
  s.emit('touchmove', [s.touch(186, 115)])
  assert.equal(s.emit('touchmove', [s.touch(150, 118)]).prevented, true)
  s.emit('touchend', [], [s.touch(140, 118)])
  assert.deepEqual(s.turns, ['next'])
})

test('short gestures, controls, multitouch, cancellation, and page changes do not turn', () => {
  for (const reason of ['short', 'control', 'pinch', 'cancel', 'page', 'disabled']) {
    const s = setup()
    s.emit('touchstart', [s.touch(200, 100)], [], reason === 'control')
    if (reason === 'pinch') s.emit('touchstart', [s.touch(200, 100), s.touch(250, 100, 2)])
    if (reason === 'cancel') s.emit('touchcancel', [])
    if (reason === 'page') s.update({ page: 3 })
    if (reason === 'disabled') s.update({ enabled: false })
    s.emit('touchend', [], [s.touch(reason === 'short' ? 180 : 80, 100)])
    assert.deepEqual(s.turns, [], reason)
    s.cleanup()
  }
})
