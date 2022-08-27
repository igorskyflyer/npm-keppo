const SEMVER = '\\d+\\.\\d+\\.\\d+(?:-[a-z]+){0,1}'
const REGEXP_SEMVER = new RegExp(`^v?${SEMVER}$`)
const REGEXP_SEMVER_STRICT = new RegExp(`^${SEMVER}$`)
const REGEXP_COMPONENT = new RegExp(/^\d+$/)
const REGEXP_LABEL = new RegExp(/^-{0,1}[a-z]+$/)

/**
 * @see {@link https://semver.org}
 * @class Keppo
 * @private {number} major
 * @private {number} minor
 * @private {number} patch
 * @private {boolean} strict
 * @private {string} label
 */
class Keppo {
  /**
   * Creates a Keppo instance.
   * @constructor
   * @param {number|string} major Major version number or a valid SemVer version string - other parameters are ignored in this case.
   * @param {number} [minor=0] Minor version number.
   * @param {number} [patch=0] Patch version number.
   * @param {boolean} [strict=true] Strict mode.
   * @param {string} [label=''] Label for the version, no need to prefix with a dash.
   * @throws {TypeError|Error} Throws an exception if any of the passed parameters are not valid.
   */
  constructor(major = 0, minor = 0, patch = 0, strict = true, label = '') {
    this.strict = strictMode(strict)
    this.patch = this.minor = this.major = 0
    this.label = label || ''

    if (typeof major === 'string') {
      this.setVersion(major)
      return this
    }

    this.major = component(major, 0)
    this.minor = component(minor, 0)
    this.patch = component(patch, 0)
  }

  /**
   * Parses the provided string as a SemVer version.
   *
   * See also {@link setVersion()}.
   * @param {string} version A valid SemVer version represented as a string, e.g. `"1.2.3"`, `"v1.5.3"`, `"2.3.4-alpha"`, `"v2.4.6-beta"`.
   * @throws {TypeError|Error} Throws an exception if the passed parameter is not valid.
   * @returns {Keppo} Returns a new instance of `Keppo` with the parsed version.
   */
  parse(version) {
    return new Keppo().setVersion(version)
  }

  /**
   * Sets the strict mode for the SemVer version, i.e. allow `v` as a prefix for SemVer, e.g. `v1.0.0`. By default, strict mode is `true`.
   * @param {boolean} [isStrict=true]
   * @returns {Keppo}
   */
  isStrict(isStrict = true) {
    this.strict = strictMode(isStrict)
    return this
  }

  /**
   * Increases the major version number for the provided value.
   * @param {number} [major=1] The major version number to increase by, defaults to `1`.
   * @throws {Error} Throws an exception if the passed parameter is not valid.
   * @returns {Keppo}
   */
  increaseMajor(major = 1) {
    if (!isValidComponent(major)) {
      throw new Error(`Expected a valid major version number but got "${major}".`)
    }

    // @ts-ignore
    this.major += major
    return this
  }

  /**
   * Increases the minor version number for the provided value.
   * @param {number} [minor=1] The minor version number to increase by, defaults to `1`.
   * @throws {Error} Throws an exception if the passed parameter is not valid.
   * @returns {Keppo}
   */
  increaseMinor(minor = 1) {
    if (!isValidComponent(minor)) {
      throw new Error(`Expected a valid minor version number but got "${minor}".`)
    }

    this.minor += minor
    return this
  }

  /**
   * Increases the patch version number for the provided value.
   * @param {number} [patch=1] The patch version number to increase by, defaults to `1`.
   * @throws {Error} Throws an exception if the passed parameter is not valid.
   * @returns {Keppo}
   */
  increasePatch(patch = 1) {
    if (!isValidComponent(patch)) {
      throw new Error(`Expected a valid patch version number got ${patch}.`)
    }

    this.patch += patch
    return this
  }

  /**
   * Decreases the major version number for the provided value.
   * @param {number} [major=1] The major version number to decrease by, defaults to `1`.
   * @throws {Error} Throws an exception if the passed parameter is not valid.
   * @returns {Keppo}
   */
  decreaseMajor(major = 1) {
    if (!isValidComponent(major)) {
      throw new Error(`Expected a valid major version number but got "${major}".`)
    }

    // @ts-ignore
    this.major = decreaseComponent(this.major, major, 'major')
    return this
  }

  /**
   * Decreases the minor version number for the provided value.
   * @param {number} [minor=1] The minor version number to decrease by, defaults to `1`.
   * @throws {Error} Throws an exception if the passed parameter is not valid.
   * @returns {Keppo}
   */
  decreaseMinor(minor = 1) {
    if (!isValidComponent(minor)) {
      throw new Error(`Expected a valid minor version number but got "${minor}".`)
    }

    this.minor = decreaseComponent(this.minor, minor, 'minor')
    return this
  }

  /**
   * Decrease the patch version number for the provided value.
   * @param {number} [patch=1] The patch version number to decrease by, defaults to `1`.
   * @throws {Error} Throws an exception if the passed parameter is not valid.
   * @returns {Keppo}
   */
  decreasePatch(patch = 1) {
    if (!isValidComponent(patch)) {
      throw new Error(`Expected a valid patch version number but got "${patch}".`)
    }

    this.patch = decreaseComponent(this.patch, patch, 'patch')
    return this
  }

  /**
   * Sets the major version number for the current Keppo instance.
   * @param {number|string} major The major version number, either as a number or as a string.
   * @throws {Error} Throws an exception if the passed parameter is not valid.
   * @returns  {Keppo}
   */
  setMajor(major) {
    if (!isValidComponent(major)) {
      throw new Error(`Expected a valid major version number but got "${major}".`)
    }

    // @ts-ignore
    this.major = +major
    return this
  }

  /**
   * Sets the minor version number for the current Keppo instance.
   * @param {number|string} minor The minor version number, either as a number or as a string.
   * @throws {Error} Throws an exception if the passed parameter is not valid.
   * @returns  {Keppo}
   */
  setMinor(minor) {
    if (!isValidComponent(minor)) {
      throw new Error(`Expected a valid minor version number but got "${minor}".`)
    }

    // @ts-ignore
    this.minor = +minor
    return this
  }

  /**
   * Sets the patch version number for the current Keppo instance.
   * @param {number|string} patch The patch version number, either as a number or as a string.
   * @throws {Error} Throws an exception if the passed parameter is not valid.
   * @returns  {Keppo}
   */
  setPatch(patch) {
    if (!isValidComponent(patch)) {
      throw new Error(`Expected a valid patch version number but got "${patch}".`)
    }

    // @ts-ignore
    this.patch = +patch
    return this
  }

  /**
   * Sets the version label for the current Keppo instance. No need to prefix with a dash "`-`", i.e. "`alpha`" and its output would be `0.1.0-alpha`.
   * @param {string} label
   * @throws {Error} Throws an exception if the passed parameter is not valid.
   * @returns {Keppo}
   */
  setLabel(label) {
    if (typeof label !== 'string') {
      throw new TypeError(`Expected a string but got "${typeof label}".`)
    }

    label = label.trim()

    if (!REGEXP_LABEL.test(label)) {
      throw new TypeError(`Expected a valid label but got "${label}".`)
    }

    if (label.charAt(0) === '-') {
      label = label.substring(1)
    }

    this.label = label
    return this
  }

  /**
   * Compares the current `Keppo` SemVer-compatible version with a provided one. The passed argument can either be another instance of `Keppo` or a valid SemVer string.
   * @param {Keppo|string} version
   * @throws {Error} Throws an exception if the passed parameter is not valid or the passed parameter is not a valid SemVer version.
   * @returns {Number} A value defined as:
   * - `-1` if the current instance version is less than the provided version,
   * - `0` if the compared versions are equal,
   * - `1` if the current instance version is greater than the provided version.
   */
  compare(version) {
    const versionType = typeof version

    if (versionType !== 'string' && versionType !== 'object') {
      throw new TypeError(`Expected either a Keppo instance or a valid SemVer string but got "${versionType}".`)
    }

    /** @type {Keppo} */
    let parsedVersion

    if (versionType === 'string') {
      // @ts-ignore
      if (!isValidVersion(version)) {
        throw new Error(`Expected a valid SemVer version but got "${version}", strict mode: ${this.isStrict}.`)
      }

      // @ts-ignore
      parsedVersion = this.parse(version)
    } else {
      // @ts-ignore
      parsedVersion = version
    }

    if (this.major > parsedVersion.major) {
      return 1
    } else if (this.major < parsedVersion.major) {
      return -1
    }

    if (this.minor > parsedVersion.minor) {
      return 1
    } else if (this.minor < parsedVersion.minor) {
      return -1
    }

    if (this.patch > parsedVersion.patch) {
      return 1
    } else if (this.patch < parsedVersion.patch) {
      return -1
    }

    return 0
  }

  /**
   * Prints to console the String representation of the current `Keppo` object.
   * @returns {void}
   */
  output() {
    console.log(this.toString())
  }

  /**
   * Sets the current Keppo version. The passed value must be a valid SemVer string. This will replace all the previous version information.
   *
   * See also {@link parse()}.
   * @param {string} version
   * @returns {Keppo}
   * @throws {TypeError|Error} Throws an exception if the passed parameter is not valid or the passed parameter is not a valid SemVer version.
   */
  setVersion(version) {
    if (typeof version !== 'string') {
      throw new TypeError(`Expected a string but got "${typeof version}".`)
    }

    // always assume strict = false,
    // to avoid false positives
    if (!isValidVersion(version, false)) {
      throw new Error(`Expected a valid SemVer version but got "${version}", strict mode: ${this.strict}.`)
    }

    const components = version.trim().toLowerCase().split('.')

    if (components[0].charAt(0) === 'v') {
      this.isStrict(false)
    } else {
      this.isStrict(true)
    }

    this.setMajor(components[0].replace(/v\.*/, ''))
    this.setMinor(components[1])

    let labelIndex = components[2].indexOf('-')

    if (labelIndex > -1) {
      this.setLabel(components[2].substring(components[2].indexOf('-') + 1))
    } else {
      labelIndex = components[2].length
    }

    this.setPatch(components[2].substring(0, labelIndex))

    return this
  }

  /**
   * Formats the current `Keppo` object as a String.
   * @returns {string}
   */
  toString() {
    return `${this.strict ? '' : 'v'}${this.major}.${this.minor}.${this.patch}${formatLabel(this.label)}`
  }

  /**
   * Checks whether the provided String is a valid SemVer version number. Useful for checking whether a version is valid before calling {@link setVersion()}.
   * @param {string} version A String representing a SemVer version number
   * @param {boolean} [isStrict=true] A Boolean representing whether the strict mode is enabled, defaults to **true** and is not inferred from this instance's `strict` property.
   * @returns {boolean}
   */
  isValid(version, isStrict = true) {
    return isValidVersion(version, isStrict)
  }

  /**
   * Checks whether this instance's major version can be safely increased by the given value.
   *
   * Read more about Integer safety on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger MDN}.
   * @param {number} major The value to increase by
   * @returns {boolean}
   */
  canIncreaseMajor(major) {
    return Number.isSafeInteger(this.major + major)
  }

  /**
   * Checks whether a minor version can be safely increased by the given value.
   *
   * Read more about Integer safety on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger MDN}.
   * @param {number} minor The value to increase by
   * @returns {boolean}
   */
  canIncreaseMinor(minor) {
    return Number.isSafeInteger(this.minor + minor)
  }

  /**
   * Checks whether a patch version can be safely increased by the given value.
   *
   * Read more about Integer safety on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger MDN}.
   * @param {number} patch The value to increase by
   * @returns {boolean}
   */
  canIncreasePatch(patch) {
    return Number.isSafeInteger(this.patch + patch)
  }
}

/**
 * @private
 * @param {string|number} component
 * @returns {boolean}
 */
function isValidComponent(component) {
  const componentType = typeof component

  return (
    (componentType === 'number' && Number.isSafeInteger(component)) ||
    (componentType === 'string' && REGEXP_COMPONENT.test(component.toString()))
  )
}

/**
 * @private
 * @param {number|string} component
 * @param {number} defaultValue
 * @returns {number}
 */
function component(component, defaultValue) {
  const componentType = typeof component

  if (componentType === 'undefined') {
    return defaultValue
  }

  if (componentType === 'number') {
    if (!Number.isSafeInteger(component)) {
      throw new RangeError(`Expected a safe integer value but got ${component}.`)
    }

    // @ts-ignore
    return component
  } else if (componentType === 'string') {
    if (!REGEXP_COMPONENT.test(component.toString())) {
      throw new Error(`Expected a valid SemVer version but got "${component}".`)
    }

    return +component
  } else {
    throw new TypeError(`Expected a argument of either String or Number type but got ${componentType}.`)
  }
}

/**
 * @private
 * @param {string} label
 * @returns {string}
 */
function formatLabel(label) {
  if (!label) {
    return ''
  }

  return `-${label}`
}

/**
 * @private
 * @param {number} component
 * @param {number} value
 * @param {string} componentName
 * @throws {Error}
 * @returns {Number}
 */
function decreaseComponent(component, value, componentName) {
  if (typeof component !== 'number' || typeof value !== 'number') {
    throw new TypeError('Expected both parameters to be numbers.')
  }

  const result = component - value

  if (result < 0) {
    throw new Error(`Expected ${componentName} version number to be positive but got "${result}".`)
  }

  return result
}

/**
 * @private
 * @param {string} version
 * @returns {boolean}
 */
function isValidVersion(version, isStrict = true) {
  if (strictMode(isStrict)) {
    return REGEXP_SEMVER_STRICT.test(version)
  } else {
    return REGEXP_SEMVER.test(version)
  }
}

/**
 * @private
 * @param {boolean} isStrict
 * @returns {boolean}
 */
function strictMode(isStrict = true) {
  if (typeof isStrict !== 'boolean') {
    return true
  } else {
    return isStrict
  }
}

module.exports = { Keppo }
