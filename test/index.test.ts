import { assert, describe, it } from 'vitest'
import { Keppo, KeppoComparison } from '../src/index.js'

const max: number = Number.MAX_SAFE_INTEGER

describe('🧪 Keppo tests 🧪', () => {
  // Construction & formatting
  it('#1 basic numeric init', () => {
    assert.strictEqual(new Keppo(1, 0, 0).toString(), '1.0.0')
  })

  it('#2 basic string init', () => {
    assert.strictEqual(new Keppo('1.0.0').toString(), '1.0.0')
  })

  it('#3 numeric with "v" prefix', () => {
    assert.strictEqual(new Keppo(1, 0, 0, false).toString(), 'v1.0.0')
  })

  it('#4 string with "v" prefix', () => {
    assert.strictEqual(new Keppo('v1.0.0').toString(), 'v1.0.0')
  })

  it('#5 numeric with label', () => {
    assert.strictEqual(
      new Keppo(1, 0, 0, true, 'alpha').toString(),
      '1.0.0-alpha'
    )
  })

  it('#6 string with label', () => {
    assert.strictEqual(new Keppo('1.0.0-alpha').toString(), '1.0.0-alpha')
  })

  it('#7 setVersion() override', () => {
    const instance = new Keppo(0, 0, 0)
    assert.strictEqual(instance.setVersion('1.2.3').toString(), '1.2.3')
  })

  // Increments
  it('#8 major +1', () => {
    assert.strictEqual(new Keppo(1, 0, 0).increaseMajor().toString(), '2.0.0')
  })

  it('#9 major +2', () => {
    assert.strictEqual(new Keppo('1.0.0').increaseMajor(2).toString(), '3.0.0')
  })

  it('#10 minor +1', () => {
    assert.strictEqual(new Keppo(1, 0, 0).increaseMinor().toString(), '1.1.0')
  })

  it('#11 minor +3', () => {
    assert.strictEqual(new Keppo('1.0.0').increaseMinor(3).toString(), '1.3.0')
  })

  it('#12 patch +1', () => {
    assert.strictEqual(new Keppo(1, 0, 0).increasePatch().toString(), '1.0.1')
  })

  it('#13 patch +5', () => {
    assert.strictEqual(new Keppo('1.0.0').increasePatch(5).toString(), '1.0.5')
  })

  // Decrements
  it('#14 major -1', () => {
    assert.strictEqual(new Keppo(2, 0, 0).decreaseMajor().toString(), '1.0.0')
  })

  it('#15 major -2', () => {
    assert.strictEqual(new Keppo('4.0.0').decreaseMajor(2).toString(), '2.0.0')
  })

  it('#16 minor -1', () => {
    assert.strictEqual(new Keppo(1, 2, 0).decreaseMinor().toString(), '1.1.0')
  })

  it('#17 minor -6', () => {
    assert.strictEqual(new Keppo('1.7.0').decreaseMinor(6).toString(), '1.1.0')
  })

  it('#18 patch -1', () => {
    assert.strictEqual(new Keppo(1, 0, 2).decreasePatch().toString(), '1.0.1')
  })

  it('#19 patch -7', () => {
    assert.strictEqual(new Keppo('1.0.8').decreasePatch(7).toString(), '1.0.1')
  })

  // Setters
  it('#20 setMajor(4)', () => {
    assert.strictEqual(new Keppo(1, 0, 0).setMajor(4).toString(), '4.0.0')
  })

  it('#21 setMajor(4) from string', () => {
    assert.strictEqual(new Keppo('1.0.0').setMajor(4).toString(), '4.0.0')
  })

  it('#22 setMinor(4)', () => {
    assert.strictEqual(new Keppo(1, 0, 0).setMinor(4).toString(), '1.4.0')
  })

  it('#23 setMinor(4) from string', () => {
    assert.strictEqual(new Keppo('1.0.0').setMinor(4).toString(), '1.4.0')
  })

  it('#24 setPatch(4)', () => {
    assert.strictEqual(new Keppo(1, 0, 0).setPatch(4).toString(), '1.0.4')
  })

  it('#25 setPatch(4) from string', () => {
    assert.strictEqual(new Keppo('1.0.0').setPatch(4).toString(), '1.0.4')
  })

  // Label mutation
  it('#26 setLabel("beta") from alpha', () => {
    assert.strictEqual(
      new Keppo(1, 0, 0, true, 'alpha').setLabel('beta').toString(),
      '1.0.0-beta'
    )
  })

  it('#27 setLabel("beta") from string', () => {
    assert.strictEqual(
      new Keppo('1.0.0-alpha').setLabel('beta').toString(),
      '1.0.0-beta'
    )
  })

  // Comparison: equal
  it('#28 compare equal (numeric)', () => {
    assert.equal(
      new Keppo(1, 0, 0).compareWith('1.0.0'),
      KeppoComparison.Current
    )
  })

  it('#29 compare equal (string)', () => {
    assert.equal(
      new Keppo('1.0.0').compareWith('1.0.0'),
      KeppoComparison.Current
    )
  })

  it('#30 compare equal 2.3.4 (numeric)', () => {
    assert.equal(
      new Keppo(2, 3, 4).compareWith('2.3.4'),
      KeppoComparison.Current
    )
  })

  it('#31 compare equal 2.3.4 (string)', () => {
    assert.equal(
      new Keppo('2.3.4').compareWith('2.3.4'),
      KeppoComparison.Current
    )
  })

  // Comparison: less than
  it('#32 compare major <', () => {
    assert.equal(new Keppo(1, 0, 0).compareWith('2.0.0'), KeppoComparison.Older)
  })

  it('#33 compare major < from string', () => {
    assert.equal(new Keppo('1.0.0').compareWith('2.0.0'), KeppoComparison.Older)
  })

  it('#34 compare minor <', () => {
    assert.equal(new Keppo(1, 0, 0).compareWith('1.1.0'), KeppoComparison.Older)
  })

  it('#35 compare minor < from string', () => {
    assert.equal(new Keppo('1.0.0').compareWith('1.1.0'), KeppoComparison.Older)
  })

  it('#36 compare patch <', () => {
    assert.equal(new Keppo(1, 0, 0).compareWith('1.0.1'), KeppoComparison.Older)
  })

  it('#37 compare patch < from string', () => {
    assert.equal(new Keppo('1.0.0').compareWith('1.0.1'), KeppoComparison.Older)
  })

  // Comparison: greater than
  it('#38 compare major >', () => {
    assert.equal(new Keppo(2, 0, 0).compareWith('1.0.0'), KeppoComparison.Newer)
  })

  it('#39 compare major > from string', () => {
    assert.equal(new Keppo('2.0.0').compareWith('1.0.0'), KeppoComparison.Newer)
  })

  it('#40 compare minor >', () => {
    assert.equal(new Keppo(1, 1, 0).compareWith('1.0.0'), KeppoComparison.Newer)
  })

  it('#41 compare minor > from string', () => {
    assert.equal(new Keppo('1.1.0').compareWith('1.0.0'), KeppoComparison.Newer)
  })

  it('#42 compare patch >', () => {
    assert.equal(new Keppo(1, 0, 1).compareWith('1.0.0'), KeppoComparison.Newer)
  })

  it('#43 compare patch > from string', () => {
    assert.equal(new Keppo('1.0.1').compareWith('1.0.0'), KeppoComparison.Newer)
  })

  // Can increase
  it('#44 canIncreaseMajor valid', () => {
    assert.isTrue(new Keppo('1.0.1').canIncreaseMajor(1))
  })

  it('#45 canIncreaseMajor overflow', () => {
    assert.isFalse(new Keppo('1.0.1').canIncreaseMajor(max + 1))
  })

  // Can increase (continued)
  it('#46 canIncreaseMinor valid', () => {
    assert.isTrue(new Keppo('1.0.1').canIncreaseMinor(1))
  })

  it('#47 canIncreaseMinor overflow', () => {
    assert.isFalse(new Keppo('1.0.1').canIncreaseMinor(max + 1))
  })

  it('#48 canIncreasePatch valid', () => {
    assert.isTrue(new Keppo('1.0.1').canIncreasePatch(1))
  })

  it('#49 canIncreasePatch overflow', () => {
    assert.isFalse(new Keppo('1.0.1').canIncreasePatch(max + 1))
  })

  // Max increase
  it('#50 maxIncreaseMajor', () => {
    assert.equal(new Keppo('32.0.1').maxIncreaseMajor(), max - 32)
  })

  it('#51 maxIncreaseMinor', () => {
    assert.equal(new Keppo('1.32.1').maxIncreaseMinor(), max - 32)
  })

  it('#52 maxIncreasePatch', () => {
    assert.equal(new Keppo('1.0.32').maxIncreasePatch(), max - 32)
  })

  // Validation
  it('#53 isValid basic', () => {
    assert.isTrue(Keppo.isValid('1.0.0'))
  })

  it('#54 isValid with "v" (loose)', () => {
    assert.isTrue(Keppo.isValid('v1.0.0', false))
  })

  it('#55 isValid with "v" (strict)', () => {
    assert.isFalse(Keppo.isValid('v1.0.0'))
  })

  it('#56 isValid empty', () => {
    assert.isFalse(Keppo.isValid(''))
  })

  it('#57 isValid incomplete', () => {
    assert.isFalse(Keppo.isValid('1.0'))
  })

  it('#58 isValid invalid', () => {
    assert.isFalse(Keppo.isValid('version'))
  })

  // Label formatting
  it('#59 label with dots (loose)', () => {
    assert.equal(
      new Keppo(1, 2, 3, false, 'alpha.1-beta').toString(),
      'v1.2.3-alpha.1-beta'
    )
  })

  it('#60 label with dots (strict)', () => {
    assert.equal(
      new Keppo(1, 2, 3, true, 'alpha.1-beta').toString(),
      '1.2.3-alpha.1-beta'
    )
  })

  it('#61 invalid label throws', () => {
    assert.throws(() => new Keppo(1, 0, 0, true, '🔥hotfix'), RangeError)
  })

  it('#62 label with numeric suffix', () => {
    assert.equal(new Keppo(1, 0, 0, true, 'beta.1').toString(), '1.0.0-beta.1')
  })

  it('#63 label with "v" prefix', () => {
    assert.equal(new Keppo(1, 0, 0, false, 'alpha').toString(), 'v1.0.0-alpha')
  })

  // Invalid input
  it('#64 negative major throws', () => {
    assert.throws(() => new Keppo(-1, 5, 6, true), RangeError)
  })

  it('#65 negative string throws', () => {
    assert.throws(() => new Keppo('-1.2.3'), RangeError)
  })

  // Static API
  it('#66 Keppo.from() basic', () => {
    const instance: Keppo = Keppo.from('1.2.3-alpha')
    assert.equal(instance.toString(), '1.2.3-alpha')
  })

  it('#67 Keppo.from() with label', () => {
    const instance: Keppo = Keppo.from('1.2.3-alpha')
    assert.equal(instance.toString(), '1.2.3-alpha')
  })
})
