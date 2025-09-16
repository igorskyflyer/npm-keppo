const SEMVER: string =
  '\\d+\\.\\d+\\.\\d+(?:-[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?'

const REGEXP_SEMVER: RegExp = new RegExp(`^v?${SEMVER}$`)
const REGEXP_SEMVER_STRICT: RegExp = new RegExp(`^${SEMVER}$`)
const REGEXP_COMPONENT: RegExp = /^\d+$/
const REGEXP_LABEL: RegExp = /^[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*$/
const REGEXP_VERSION: RegExp = /^v/

/**
 * Represents the result of a version comparison between two `Keppo` instances or SemVer strings.
 *
 * - `Older (-1)`: The current version is less than the compared version
 * - `Current (0)`: Both versions are equal
 * - `Newer (1)`: The current version is greater than the compared version
 *
 * Used to improve readability when working with `compareWith()` results.
 */
export enum KeppoComparison {
  Older = -1,
  Current = 0,
  Newer = 1
}

/**
 * A fluent, chainable SemVer utility for parsing, mutating, and comparing version strings.
 *
 * Implements core SemVer logic with optional strict mode and label support.
 *
 * See {@link https://semver.org} for specification details.
 */
export class Keppo {
  static VERSION: string = '2.0.0'

  #major: number
  #minor: number
  #patch: number
  #strict: boolean
  #label: string

  /**
   * Creates a new `Keppo` instance from individual version components.
   *
   * Accepts `major`, `minor`, and `patch` numbers, with optional `strict` mode and label.
   *
   * @param major - Major version number (default: `0`).
   * @param minor - Minor version number (default: `0`).
   * @param patch - Patch version number (default: `0`).
   * @param strict - Enables strict parsing mode (default: `true`).
   * @param label - Optional label (e.g. `'alpha'`, `'beta.1'`), no dash prefix needed.
   * @throws {Error} If any component is invalid or violates SemVer rules.
   */
  constructor(
    major: number,
    minor: number,
    patch: number,
    strict?: boolean,
    label?: string
  )
  /**
   * Creates a new `Keppo` instance from a full SemVer string.
   *
   * Parses the string and sets all version components and label accordingly.
   *
   * @param version - A valid SemVer string (e.g. `'1.2.3'`, `'v2.0.0-alpha'`).
   * @throws {Error} If the string is invalid or fails SemVer parsing.
   */
  constructor(version: string)
  constructor(
    major: number | string = 0,
    minor: number = 0,
    patch: number = 0,
    strict: boolean = true,
    label: string = ''
  ) {
    this.#strict = strictMode(strict)
    this.#patch = this.#minor = this.#major = 0
    this.#label = ''

    if (typeof major === 'string') {
      this.setVersion(major)
      return
    }

    this.#major = component(major, 0)
    this.#minor = component(minor, 0)
    this.#patch = component(patch, 0)
    this.setLabel(label)
  }

  /**
   * Creates a new `Keppo` instance from a valid SemVer string.
   *
   * Equivalent to `new Keppo(...).setVersion(version)` but more fluent.
   *
   * @param version - A valid SemVer string (e.g. `'1.2.3'`, `'v2.0.0-alpha'`).
   * @param strict - Optional flag to enable strict parsing mode.
   * @throws {RangeError} If the version string is invalid.
   * @returns A fully initialized `Keppo` instance.
   */
  static from(version: string, strict?: boolean): Keppo {
    return new Keppo(0, 0, 0, strict).setVersion(version)
  }

  /**
   * Checks whether a given string is a valid SemVer version.
   *
   * Useful for validating a version before calling {@link setVersion()} or instantiating a `Keppo` instance.
   *
   * @param version - A SemVer string (e.g. `'1.2.3'`, `'v2.0.0-alpha'`).
   * @param isStrict - Whether to enable strict parsing (default: `true`).
   * @returns `true` if the version is valid; otherwise `false`.
   */
  static isValid(version: string, isStrict: boolean = true): boolean {
    return isValidVersion(version, isStrict)
  }

  /**
   * Sets the strict mode for SemVer parsing.
   *
   * When enabled, version strings must follow strict SemVer format (e.g. no `v` prefix).
   * When disabled, relaxed formats like `v1.0.0` are accepted.
   *
   * @param isStrict - Whether to enable strict mode (default: `true`).
   * @returns The current `Keppo` instance.
   */
  setStrict(isStrict: boolean = true): Keppo {
    this.#strict = strictMode(isStrict)
    return this
  }

  /**
   * Increases the major version number by the specified amount.
   *
   * Resets the minor and patch components to `0` after incrementing.
   *
   * @param major - The amount to increase by (default: `1`).
   * @throws {Error} If the value is invalid or exceeds safe integer limits.
   * @returns The current `Keppo` instance.
   */
  increaseMajor(major: number = 1): Keppo {
    if (!isValidComponent(major)) {
      throw new RangeError(
        `Expected a valid major version number but got "${major}".`
      )
    }

    this.#major += major
    this.#minor = 0
    this.#patch = 0

    return this
  }

  /**
   * Increases the minor version number by the specified amount.
   *
   * Resets the patch component to `0` after incrementing.
   *
   * @param minor - The amount to increase by (default: `1`).
   * @throws {Error} If the value is invalid or exceeds safe integer limits.
   * @returns The current `Keppo` instance.
   */
  increaseMinor(minor: number = 1): Keppo {
    if (!isValidComponent(minor)) {
      throw new RangeError(
        `Expected a valid minor version number but got "${minor}".`
      )
    }

    this.#minor += minor
    this.#patch = 0

    return this
  }

  /**
   * Increases the patch version number by the specified amount.
   *
   * @param patch - The amount to increase by (default: `1`).
   * @throws {Error} If the value is invalid or exceeds safe integer limits.
   * @returns The current `Keppo` instance.
   */
  increasePatch(patch: number = 1): Keppo {
    if (!isValidComponent(patch)) {
      throw new RangeError(
        `Expected a valid patch version number but got ${patch}.`
      )
    }

    this.#patch += patch
    return this
  }

  /**
   * Decreases the major version number by the specified amount.
   *
   * Resets the minor and patch components to `0` after decrementing.
   *
   * @param major - The amount to decrease by (default: `1`).
   * @throws {Error} If the value is invalid or results in a negative version.
   * @returns The current `Keppo` instance.
   */
  decreaseMajor(major: number = 1): Keppo {
    if (!isValidComponent(major)) {
      throw new RangeError(
        `Expected a valid major version number but got "${major}".`
      )
    }

    this.#major = decreaseComponent(this.#major, major, 'major')
    this.#minor = 0
    this.#patch = 0
    return this
  }

  /**
   * Decreases the minor version number by the specified amount.
   *
   * Resets the patch component to `0` after decrementing.
   *
   * @param minor - The amount to decrease by (default: `1`).
   * @throws {Error} If the value is invalid or results in a negative minor version.
   * @returns The current `Keppo` instance.
   */
  decreaseMinor(minor: number = 1): Keppo {
    if (!isValidComponent(minor)) {
      throw new RangeError(
        `Expected a valid minor version number but got "${minor}".`
      )
    }

    this.#minor = decreaseComponent(this.#minor, minor, 'minor')
    this.#patch = 0
    return this
  }

  /**
   * Decreases the patch version number by the specified amount.
   *
   * @param patch - The amount to decrease by (default: `1`).
   * @throws {Error} If the value is invalid or results in a negative patch version.
   * @returns The current `Keppo` instance.
   */
  decreasePatch(patch: number = 1): Keppo {
    if (!isValidComponent(patch)) {
      throw new RangeError(
        `Expected a valid patch version number but got "${patch}".`
      )
    }

    this.#patch = decreaseComponent(this.#patch, patch, 'patch')
    return this
  }

  /**
   * Sets the major version number for the current `Keppo` instance.
   *
   * @param major - The major version as a number (e.g. `2`).
   * @throws {Error} If the value is invalid, non-numeric, or negative.
   * @returns The current `Keppo` instance.
   */
  setMajor(major: number): Keppo {
    if (!isValidComponent(major)) {
      throw new RangeError(
        `Expected a valid major version number but got "${major}".`
      )
    }

    this.#major = +major
    return this
  }

  /**
   * Sets the minor version number for the current `Keppo` instance.
   *
   * @param minor - The minor version, as a number (e.g. `3`).
   * @throws {Error} If the value is invalid, non-numeric, or negative.
   * @returns The current `Keppo` instance.
   */
  setMinor(minor: number): Keppo {
    if (!isValidComponent(minor)) {
      throw new RangeError(
        `Expected a valid minor version number but got "${minor}".`
      )
    }

    this.#minor = +minor
    return this
  }

  /**
   * Sets the patch version number for the current `Keppo` instance.
   *
   * @param patch - The patch version, as a number (e.g. `4`).
   * @throws {Error} If the value is invalid, non-numeric, or negative.
   * @returns The current `Keppo` instance.
   */
  setPatch(patch: number): Keppo {
    if (!isValidComponent(patch)) {
      throw new RangeError(
        `Expected a valid patch version number but got "${patch}".`
      )
    }

    this.#patch = +patch
    return this
  }

  /**
   * Sets the version label for the current `Keppo` instance.
   *
   * The label will be appended to the version string with a dash (e.g. `'alpha'` → `0.1.0-alpha`).
   * No need to include the dash manually.
   *
   * @param label - A valid label string (e.g. `'alpha'`, `'beta.1'`).
   * @throws {Error} If the label is invalid or fails pattern validation.
   * @returns The current `Keppo` instance.
   */
  setLabel(label: string): Keppo {
    if (typeof label !== 'string') {
      throw new TypeError(
        `Expected a valid label type but got "${typeof label}".`
      )
    }

    if (label.length === 0) {
      return this
    }

    label = label.trim()

    if (!REGEXP_LABEL.test(label)) {
      throw new RangeError(`Expected a valid label value but got "${label}".`)
    }

    if (label.charAt(0) === '-') {
      label = label.substring(1)
    }

    this.#label = label
    return this
  }

  /**
   * Clears the label of the current Keppo instance.
   * @returns The current `Keppo` instance.
   */
  clearLabel(): Keppo {
    return this.setLabel('')
  }

  /**
   * Compares the current `Keppo` version against another `Keppo` instance.
   *
   * Returns a numeric comparison result:
   * - `-1` if the current version is older
   * - `0` if both versions are equal
   * - `1` if the current version is newer
   *
   * For improved readability, use the `KeppoComparison` enum.
   *
   * @param version - Another `Keppo` instance to compare against.
   * @throws {Error} If the input is invalid.
   * @returns A numeric comparison result (`-1`, `0`, or `1`).
   */
  compareWith(version: Keppo): KeppoComparison

  /**
   * Compares the current `Keppo` version against a SemVer string.
   *
   * Returns a numeric comparison result:
   * - `-1` if the current version is older
   * - `0` if both versions are equal
   * - `1` if the current version is newer
   *
   * For improved readability, use the `KeppoComparison` enum.
   *
   * @param version - A valid SemVer string (e.g. `'1.2.3-beta.1'`) to compare against.
   * @throws {Error} If the input is not a valid SemVer string.
   * @returns A numeric comparison result (`-1`, `0`, or `1`).
   */
  compareWith(version: string): KeppoComparison

  compareWith(version: Keppo | string): KeppoComparison {
    if (typeof version !== 'string' && typeof version !== 'object') {
      throw new TypeError(
        `Expected either a Keppo instance or a valid SemVer string but got "${typeof version}".`
      )
    }

    let parsedVersion: Keppo

    if (typeof version === 'string') {
      if (!isValidVersion(version)) {
        throw new RangeError(
          `Expected a valid SemVer version but got "${version}" with strict mode = ${this.setStrict}.`
        )
      }

      parsedVersion = Keppo.from(version)
    } else {
      parsedVersion = version
    }

    if (this.#major > parsedVersion.#major) {
      return KeppoComparison.Newer
    } else if (this.#major < parsedVersion.#major) {
      return KeppoComparison.Older
    }

    if (this.#minor > parsedVersion.#minor) {
      return KeppoComparison.Newer
    } else if (this.#minor < parsedVersion.#minor) {
      return KeppoComparison.Older
    }

    if (this.#patch > parsedVersion.#patch) {
      return KeppoComparison.Newer
    } else if (this.#patch < parsedVersion.#patch) {
      return KeppoComparison.Older
    }

    return KeppoComparison.Current
  }

  /**
   * Prints to console the String representation of the current `Keppo` object.
   * @returns {void}
   */
  output(): void {
    // biome-ignore lint/suspicious/noConsole: Needed for output
    console.log(this.toString())
  }

  /**
   * Sets the current version for the `Keppo` instance.
   *
   * Replaces all existing version components and label with values parsed from the provided SemVer string.
   *
   * See also {@link Keppo.from()}.
   *
   * @param version - A valid SemVer string (e.g. `'1.2.3'`, `'v2.0.0-beta.1'`).
   * @throws {Error} If the string is invalid or fails SemVer parsing.
   * @returns The current `Keppo` instance.
   */
  setVersion(version: string): Keppo {
    if (typeof version !== 'string') {
      throw new TypeError(`Expected a string but got "${typeof version}".`)
    }

    // always assume strict = false,
    // to avoid false positives
    if (!isValidVersion(version, false)) {
      throw new RangeError(
        `Expected a valid SemVer version but got "${version}", strict mode: ${this.#strict}.`
      )
    }

    const components: string[] = version.trim().toLowerCase().split('.')

    if (components[0].charAt(0) === 'v') {
      this.setStrict(false)
    } else {
      this.setStrict(true)
    }

    const major: number = Number(components[0].replace(REGEXP_VERSION, ''))
    const minor: number = Number(components[1])

    this.setMajor(major)
    this.setMinor(minor)

    let labelIndex: number = components[2].indexOf('-')

    if (labelIndex > -1) {
      this.setLabel(components[2].substring(components[2].indexOf('-') + 1))
    } else {
      labelIndex = components[2].length
    }

    const patch: number = Number(components[2].substring(0, labelIndex))

    return this.setPatch(patch)
  }

  /**
   * Resets the current Keppo instance's SemVer version to `0.0.0` and label to an empty string.
   * @returns The current `Keppo` instance.
   */
  reset(): Keppo {
    return this.setVersion('0.0.0').setLabel('')
  }

  /**
   * Formats the current `Keppo` object as a String.
   * @returns {string}
   */
  toString(): string {
    return `${this.#strict ? '' : 'v'}${this.#major}.${this.#minor}.${this.#patch}${formatLabel(this.#label)}`
  }

  /**
   * Checks whether the major version can be safely increased by the given amount.
   *
   * Uses `Number.isSafeInteger()` to ensure the result stays within JavaScript's safe integer range.
   *
   * Read more on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger MDN}.
   *
   * @param major - The amount to increase by (default: `1`).
   * @returns `true` if the increment is safe; otherwise `false`.
   */
  canIncreaseMajor(major: number = 1): boolean {
    return Number.isSafeInteger(this.#major + major)
  }

  /**
   * Checks whether the minor version can be safely increased by the given amount.
   *
   * Uses `Number.isSafeInteger()` to ensure the result remains within JavaScript's safe integer range.
   *
   * Read more on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger MDN}.
   *
   * @param minor - The amount to increase by (default: `1`).
   * @returns `true` if the increment is safe; otherwise `false`.
   */
  canIncreaseMinor(minor: number = 1): boolean {
    return Number.isSafeInteger(this.#minor + minor)
  }

  /**
   * Checks whether the patch version can be safely increased by the given amount.
   *
   * Uses `Number.isSafeInteger()` to ensure the result remains within JavaScript's safe integer range.
   *
   * Read more on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger MDN}.
   *
   * @param patch - The amount to increase by (default: `1`).
   * @returns `true` if the increment is safe; otherwise `false`.
   */
  canIncreasePatch(patch: number = 1): boolean {
    return Number.isSafeInteger(this.#patch + patch)
  }

  /**
   * Returns the maximum safe value that can be used to increase the major version number.
   *
   * Based on JavaScript's `Number.MAX_SAFE_INTEGER`, which ensures arithmetic remains precise.
   *
   * Read more on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger MDN}.
   *
   * @returns The maximum safe increment value for the major version.
   */
  maxIncreaseMajor(): number {
    return Number.MAX_SAFE_INTEGER - this.#major
  }

  /**
   * Returns the maximum safe value that can be used to increase the minor version number.
   *
   * Based on JavaScript’s `Number.MAX_SAFE_INTEGER`, ensuring arithmetic remains precise.
   *
   * Read more on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger MDN}.
   *
   * @returns The maximum safe increment value for the minor version.
   */
  maxIncreaseMinor(): number {
    return Number.MAX_SAFE_INTEGER - this.#minor
  }

  /**
   * Returns the maximum safe value that can be used to increase the patch version number.
   *
   * Based on JavaScript’s `Number.MAX_SAFE_INTEGER`, ensuring arithmetic remains precise.
   *
   * Read more on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger MDN}.
   *
   * @returns The maximum safe increment value for the patch version.
   */
  maxIncreasePatch(): number {
    return Number.MAX_SAFE_INTEGER - this.#patch
  }
}

function isValidComponent(component: string | number): boolean {
  if (
    typeof component === 'number' &&
    component >= 0 &&
    Number.isSafeInteger(component)
  ) {
    return true
  }

  if (typeof component === 'string' && REGEXP_COMPONENT.test(component)) {
    return true
  }

  return false
}

function component(component: number | string, defaultValue: number): number {
  if (typeof component === 'undefined') {
    return defaultValue
  }

  if (typeof component === 'number') {
    if (component < 0 || !Number.isSafeInteger(component)) {
      throw new RangeError(
        `Expected a safe integer value but got ${component}.`
      )
    }

    return component
  } else if (typeof component === 'string') {
    if (!REGEXP_COMPONENT.test(component.toString())) {
      throw new RangeError(
        `Expected a valid SemVer version but got "${component}".`
      )
    }

    return +component
  } else {
    throw new TypeError(
      `Expected a argument of either String or Number type but got ${typeof component}.`
    )
  }
}

function formatLabel(label: string): string {
  if (!label) {
    return ''
  }

  return `-${label}`
}

function decreaseComponent(
  component: number,
  value: number,
  componentName: string
): number {
  if (typeof component !== 'number' || typeof value !== 'number') {
    throw new TypeError('Expected both parameters to be numbers.')
  }

  const result: number = component - value

  if (result < 0) {
    throw new RangeError(
      `Expected ${componentName} version number to be positive but got "${result}".`
    )
  }

  return result
}

function isValidVersion(version: string, isStrict = true): boolean {
  if (strictMode(isStrict)) {
    return REGEXP_SEMVER_STRICT.test(version)
  } else {
    return REGEXP_SEMVER.test(version)
  }
}

function strictMode(isStrict: boolean = true): boolean {
  if (typeof isStrict !== 'boolean') {
    return true
  } else {
    return isStrict
  }
}
