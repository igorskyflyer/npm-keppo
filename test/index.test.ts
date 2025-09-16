import { assert, describe, it } from 'vitest'
import { Keppo } from '../src/index.js'

const max: number = Number.MAX_SAFE_INTEGER

describe('🧪 Keppo tests 🧪', () => {
  it('#1 should return "1.0.0"', () => {
    assert.strictEqual(new Keppo(1, 0, 0).toString(), '1.0.0')
  })

  it('#2 should return "1.0.0"', () => {
    assert.strictEqual(new Keppo('1.0.0').toString(), '1.0.0')
  })

  it('#3 should return "v1.0.0"', () => {
    assert.strictEqual(new Keppo(1, 0, 0, false).toString(), 'v1.0.0')
  })

  it('#4 should return "v1.0.0"', () => {
    assert.strictEqual(new Keppo('v1.0.0').toString(), 'v1.0.0')
  })

  it('#5 should return "1.0.0-alpha"', () => {
    assert.strictEqual(
      new Keppo(1, 0, 0, true, 'alpha').toString(),
      '1.0.0-alpha'
    )
  })

  it('#6 should return "1.0.0-alpha"', () => {
    assert.strictEqual(new Keppo('1.0.0-alpha').toString(), '1.0.0-alpha')
  })

  it('#7 should return "1.2.3"', () => {
    const instance = new Keppo(0, 0, 0)
    assert.strictEqual(instance.setVersion('1.2.3').toString(), '1.2.3')
  })

  it('#8 should return "2.0.0"', () => {
    assert.strictEqual(new Keppo(1, 0, 0).increaseMajor().toString(), '2.0.0')
  })

  it('#9 should return "3.0.0"', () => {
    assert.strictEqual(new Keppo('1.0.0').increaseMajor(2).toString(), '3.0.0')
  })

  it('#10 should return "1.1.0"', () => {
    assert.strictEqual(new Keppo(1, 0, 0).increaseMinor().toString(), '1.1.0')
  })

  it('#11 should return "1.3.0"', () => {
    assert.strictEqual(new Keppo('1.0.0').increaseMinor(3).toString(), '1.3.0')
  })

  it('#12 should return "1.0.1"', () => {
    assert.strictEqual(new Keppo(1, 0, 0).increasePatch().toString(), '1.0.1')
  })

  it('#13 should return "1.0.5"', () => {
    assert.strictEqual(new Keppo('1.0.0').increasePatch(5).toString(), '1.0.5')
  })

  it('#14 should return "1.0.0"', () => {
    assert.strictEqual(new Keppo(2, 0, 0).decreaseMajor().toString(), '1.0.0')
  })

  it('#15 should return "2.0.0"', () => {
    assert.strictEqual(new Keppo('4.0.0').decreaseMajor(2).toString(), '2.0.0')
  })

  it('#15 should return "1.1.0"', () => {
    assert.strictEqual(new Keppo(1, 2, 0).decreaseMinor().toString(), '1.1.0')
  })

  it('#16 should return "1.1.0"', () => {
    assert.strictEqual(new Keppo('1.7.0').decreaseMinor(6).toString(), '1.1.0')
  })

  it('#17 should return "1.0.1"', () => {
    assert.strictEqual(new Keppo(1, 0, 2).decreasePatch().toString(), '1.0.1')
  })

  it('#18 should return "1.0.1"', () => {
    assert.strictEqual(new Keppo('1.0.8').decreasePatch(7).toString(), '1.0.1')
  })

  it('#19 should return "4.0.0"', () => {
    assert.strictEqual(new Keppo(1, 0, 0).setMajor(4).toString(), '4.0.0')
  })

  it('#20 should return "4.0.0"', () => {
    assert.strictEqual(new Keppo('1.0.0').setMajor(4).toString(), '4.0.0')
  })

  it('#21 should return "1.4.0"', () => {
    assert.strictEqual(new Keppo(1, 0, 0).setMinor(4).toString(), '1.4.0')
  })

  it('#22 should return "1.4.0"', () => {
    assert.strictEqual(new Keppo('1.0.0').setMinor(4).toString(), '1.4.0')
  })

  it('#23 should return "1.0.4"', () => {
    assert.strictEqual(new Keppo(1, 0, 0).setPatch(4).toString(), '1.0.4')
  })

  it('#24 should return "1.0.4"', () => {
    assert.strictEqual(new Keppo('1.0.0').setPatch(4).toString(), '1.0.4')
  })

  it('#25 should return "1.0.0-beta"', () => {
    assert.strictEqual(
      new Keppo(1, 0, 0, true, 'alpha').setLabel('beta').toString(),
      '1.0.0-beta'
    )
  })

  it('#26 should return "1.0.0-beta"', () => {
    assert.strictEqual(
      new Keppo('1.0.0-alpha').setLabel('beta').toString(),
      '1.0.0-beta'
    )
  })

  it('#27 should return 0', () => {
    assert.equal(new Keppo(1, 0, 0).compare('1.0.0'), 0)
  })

  it('#28 should return 0', () => {
    assert.equal(new Keppo('1.0.0').compare('1.0.0'), 0)
  })

  it('#29 should return 0', () => {
    assert.equal(new Keppo(2, 3, 4).compare('2.3.4'), 0)
  })

  it('#30 should return 0', () => {
    assert.equal(new Keppo('2.3.4').compare('2.3.4'), 0)
  })

  it('#31 should return -1', () => {
    assert.equal(new Keppo(1, 0, 0).compare('2.0.0'), -1)
  })

  it('#32 should return -1', () => {
    assert.equal(new Keppo('1.0.0').compare('2.0.0'), -1)
  })

  it('#33 should return -1', () => {
    assert.equal(new Keppo(1, 0, 0).compare('1.1.0'), -1)
  })

  it('#34 should return -1', () => {
    assert.equal(new Keppo('1.0.0').compare('1.1.0'), -1)
  })

  it('#35 should return -1', () => {
    assert.equal(new Keppo(1, 0, 0).compare('1.0.1'), -1)
  })

  it('#36 should return -1', () => {
    assert.equal(new Keppo('1.0.0').compare('1.0.1'), -1)
  })

  it('#37 should return 1', () => {
    assert.equal(new Keppo(2, 0, 0).compare('1.0.0'), 1)
  })

  it('#38 should return 1', () => {
    assert.equal(new Keppo('2.0.0').compare('1.0.0'), 1)
  })

  it('#39 should return 1', () => {
    assert.equal(new Keppo(1, 1, 0).compare('1.0.0'), 1)
  })

  it('#40 should return 1', () => {
    assert.equal(new Keppo('1.1.0').compare('1.0.0'), 1)
  })

  it('#41 should return 1', () => {
    assert.equal(new Keppo(1, 0, 1).compare('1.0.0'), 1)
  })

  it('#42 should return 1', () => {
    assert.equal(new Keppo('1.0.1').compare('1.0.0'), 1)
  })

  it('#43 should return true', () => {
    assert.isTrue(new Keppo('1.0.1').canIncreaseMajor(1))
  })

  it('#44 should return false', () => {
    assert.isFalse(new Keppo('1.0.1').canIncreaseMajor(max + 1))
  })

  it('#45 should return true', () => {
    assert.isTrue(new Keppo('1.0.1').canIncreaseMinor(1))
  })

  it('#46 should return false', () => {
    assert.isFalse(new Keppo('1.0.1').canIncreaseMinor(max + 1))
  })

  it('#47 should return true', () => {
    assert.isTrue(new Keppo('1.0.1').canIncreasePatch(1))
  })

  it('#48 should return false', () => {
    assert.isFalse(new Keppo('1.0.1').canIncreasePatch(max + 1))
  })

  it('#49 should return true', () => {
    assert.equal(new Keppo('32.0.1').maxIncreaseMajor(), max - 32)
  })

  it('#50 should return true', () => {
    assert.equal(new Keppo('1.32.1').maxIncreaseMinor(), max - 32)
  })

  it('#51 should return true', () => {
    assert.equal(new Keppo('1.0.32').maxIncreasePatch(), max - 32)
  })

  it('#52 should return true', () => {
    assert.isTrue(Keppo.isValid('1.0.0'))
  })

  it('#53 should return true', () => {
    assert.isTrue(Keppo.isValid('v1.0.0', false))
  })

  it('#54 should return false', () => {
    assert.isFalse(Keppo.isValid('v1.0.0'))
  })

  it('#55 should return false', () => {
    assert.isFalse(Keppo.isValid(''))
  })

  it('#56 should return false', () => {
    assert.isFalse(Keppo.isValid('1.0'))
  })

  it('#57 should return false', () => {
    assert.isFalse(Keppo.isValid('version'))
  })

  it('#58 should return true', () => {
    assert.equal(
      new Keppo(1, 2, 3, false, 'alpha.1-beta').toString(),
      'v1.2.3-alpha.1-beta'
    )
  })

  it('#59 should return true', () => {
    assert.equal(
      new Keppo(1, 2, 3, true, 'alpha.1-beta').toString(),
      '1.2.3-alpha.1-beta'
    )
  })

  it('#60 should throw', () => {
    assert.throws(() => new Keppo(1, 0, 0, true, '🔥hotfix'), TypeError)
  })

  it('#61 should return true', () => {
    assert.equal(new Keppo(1, 0, 0, true, 'beta.1').toString(), '1.0.0-beta.1')
  })

  it('#62 should return true', () => {
    assert.equal(new Keppo(1, 0, 0, false, 'alpha').toString(), 'v1.0.0-alpha')
  })

  it('#63 should throw', () => {
    assert.throws(() => new Keppo(-1, 5, 6, true), RangeError)
  })

  it('#64 should throw', () => {
    assert.throws(() => new Keppo('-1.2.3'), RangeError)
  })

  it('#65 should return true', () => {
    const instance: Keppo = Keppo.from('1.2.3-alpha')
    assert.equal(instance.toString(), '1.2.3-alpha')
  })

  it('#66 should create instance from valid version string', () => {
    const instance: Keppo = Keppo.from('1.2.3-alpha')
    assert.equal(instance.toString(), '1.2.3-alpha')
  })
})
