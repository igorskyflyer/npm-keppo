const chai = require('chai').assert
const { Keppo } = require('../src/index')

describe('🧪 Keppo tests 🧪', () => {
  it('#1 should return "1.0.0"', () => {
    chai.strictEqual(new Keppo(1, 0, 0).toString(), '1.0.0')
  })

  it('#2 should return "1.0.0"', () => {
    chai.strictEqual(new Keppo('1.0.0').toString(), '1.0.0')
  })

  it('#3 should return "v1.0.0"', () => {
    chai.strictEqual(new Keppo(1, 0, 0, false).toString(), 'v1.0.0')
  })

  it('#4 should return "v1.0.0"', () => {
    chai.strictEqual(new Keppo('v1.0.0').toString(), 'v1.0.0')
  })

  it('#5 should return "1.0.0-alpha"', () => {
    chai.strictEqual(new Keppo(1, 0, 0, true, 'alpha').toString(), '1.0.0-alpha')
  })

  it('#6 should return "1.0.0-alpha"', () => {
    chai.strictEqual(new Keppo('1.0.0-alpha').toString(), '1.0.0-alpha')
  })

  it('#7 should return "1.2.3"', () => {
    const instance = new Keppo()
    chai.strictEqual(instance.parse('1.2.3').toString(), '1.2.3')
  })

  it('#8 should return "2.0.0"', () => {
    chai.strictEqual(new Keppo(1, 0, 0).increaseMajor().toString(), '2.0.0')
  })

  it('#9 should return "3.0.0"', () => {
    chai.strictEqual(new Keppo('1.0.0').increaseMajor(2).toString(), '3.0.0')
  })

  it('#10 should return "1.1.0"', () => {
    chai.strictEqual(new Keppo(1, 0, 0).increaseMinor().toString(), '1.1.0')
  })

  it('#11 should return "1.3.0"', () => {
    chai.strictEqual(new Keppo('1.0.0').increaseMinor(3).toString(), '1.3.0')
  })

  it('#12 should return "1.0.1"', () => {
    chai.strictEqual(new Keppo(1, 0, 0).increasePatch().toString(), '1.0.1')
  })

  it('#13 should return "1.0.5"', () => {
    chai.strictEqual(new Keppo('1.0.0').increasePatch(5).toString(), '1.0.5')
  })

  it('#14 should return "1.0.0"', () => {
    chai.strictEqual(new Keppo(2, 0, 0).decreaseMajor().toString(), '1.0.0')
  })

  it('#15 should return "2.0.0"', () => {
    chai.strictEqual(new Keppo('4.0.0').decreaseMajor(2).toString(), '2.0.0')
  })

  it('#15 should return "1.1.0"', () => {
    chai.strictEqual(new Keppo(1, 2, 0).decreaseMinor().toString(), '1.1.0')
  })

  it('#16 should return "1.1.0"', () => {
    chai.strictEqual(new Keppo('1.7.0').decreaseMinor(6).toString(), '1.1.0')
  })

  it('#17 should return "1.0.1"', () => {
    chai.strictEqual(new Keppo(1, 0, 2).decreasePatch().toString(), '1.0.1')
  })

  it('#18 should return "1.0.1"', () => {
    chai.strictEqual(new Keppo('1.0.8').decreasePatch(7).toString(), '1.0.1')
  })

  it('#19 should return "4.0.0"', () => {
    chai.strictEqual(new Keppo(1, 0, 0).setMajor(4).toString(), '4.0.0')
  })

  it('#20 should return "4.0.0"', () => {
    chai.strictEqual(new Keppo('1.0.0').setMajor(4).toString(), '4.0.0')
  })

  it('#21 should return "1.4.0"', () => {
    chai.strictEqual(new Keppo(1, 0, 0).setMinor(4).toString(), '1.4.0')
  })

  it('#22 should return "1.4.0"', () => {
    chai.strictEqual(new Keppo('1.0.0').setMinor(4).toString(), '1.4.0')
  })

  it('#23 should return "1.0.4"', () => {
    chai.strictEqual(new Keppo(1, 0, 0).setPatch(4).toString(), '1.0.4')
  })

  it('#24 should return "1.0.4"', () => {
    chai.strictEqual(new Keppo('1.0.0').setPatch(4).toString(), '1.0.4')
  })

  it('#25 should return "1.0.0-beta"', () => {
    chai.strictEqual(new Keppo(1, 0, 0, true, 'alpha').setLabel('beta').toString(), '1.0.0-beta')
  })

  it('#26 should return "1.0.0-beta"', () => {
    chai.strictEqual(new Keppo('1.0.0-alpha').setLabel('beta').toString(), '1.0.0-beta')
  })

  it('#27 should return 0', () => {
    chai.equal(new Keppo(1, 0, 0).compare('1.0.0'), 0)
  })

  it('#28 should return 0', () => {
    chai.equal(new Keppo('1.0.0').compare('1.0.0'), 0)
  })

  it('#29 should return 0', () => {
    chai.equal(new Keppo(2, 3, 4).compare('2.3.4'), 0)
  })

  it('#30 should return 0', () => {
    chai.equal(new Keppo('2.3.4').compare('2.3.4'), 0)
  })

  it('#31 should return -1', () => {
    chai.equal(new Keppo(1, 0, 0).compare('2.0.0'), -1)
  })

  it('#32 should return -1', () => {
    chai.equal(new Keppo('1.0.0').compare('2.0.0'), -1)
  })

  it('#33 should return -1', () => {
    chai.equal(new Keppo(1, 0, 0).compare('1.1.0'), -1)
  })

  it('#34 should return -1', () => {
    chai.equal(new Keppo('1.0.0').compare('1.1.0'), -1)
  })

  it('#35 should return -1', () => {
    chai.equal(new Keppo(1, 0, 0).compare('1.0.1'), -1)
  })

  it('#36 should return -1', () => {
    chai.equal(new Keppo('1.0.0').compare('1.0.1'), -1)
  })

  it('#37 should return 1', () => {
    chai.equal(new Keppo(2, 0, 0).compare('1.0.0'), 1)
  })

  it('#38 should return 1', () => {
    chai.equal(new Keppo('2.0.0').compare('1.0.0'), 1)
  })

  it('#39 should return 1', () => {
    chai.equal(new Keppo(1, 1, 0).compare('1.0.0'), 1)
  })

  it('#40 should return 1', () => {
    chai.equal(new Keppo('1.1.0').compare('1.0.0'), 1)
  })

  it('#41 should return 1', () => {
    chai.equal(new Keppo(1, 0, 1).compare('1.0.0'), 1)
  })

  it('#42 should return 1', () => {
    chai.equal(new Keppo('1.0.1').compare('1.0.0'), 1)
  })
})
