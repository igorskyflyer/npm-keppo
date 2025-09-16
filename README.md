<div align="center">
  <img src="https://raw.githubusercontent.com/igorskyflyer/npm-keppo/main/media/keppo.png" alt="Icon of Keppo" width="256" height="256">
  <h1>Keppo</h1>
</div>

<br>

<h4 align="center">
  🎡 A SemVer engine with a fluent API to parse, manage, compare, and output version numbers. 🧮
</h4>

<br>

## 📃 Table of Contents

- [**Features**](#-features)
- [**Usage**](#-usage)
- [**API**](#-api)
- [**Examples**](#️-examples)
- [**Changelog**](#-changelog)
- [**Support**](#-support)
- [**License**](#-license)
- [**Related**](#-related)
- [**Author**](#-author)

<br>

## 🤖 Features

`Keppo` is a fluent SemVer engine, every method returns the instance, so you can chain mutations like *poetry*:

`keppo.ts`
```ts
new Keppo('1.2.3-alpha')
  .increaseMajor()
  .setLabel('beta')
  .decreasePatch()
  .toString() // → '2.2.2-beta'
```

- 🔢 Parses & validates **SemVer** strings like `'1.2.3'`, `'v2.0.0-alpha'`
- 🧠 Strict & loose mode support for flexible parsing
- ⬆️ Increments major, minor, or patch with auto-reset and safety checks for overflows
- ⬇️ Decrements safely, never underflows
- 🏷️ Sets & formats labels like `'alpha'`, `'beta.1'`
- 🔍 Compares versions and returns `-1`, `0`, or `1`
- 🧪 Validates version strings before use
- 🧮 Calculates max safe increment for each component
- 🧾 Prints version with optional `'v'` prefix
- 🛡️ Guards against unsafe integers and malformed input

<br>
<br>

## 🕵🏼 Usage

Install it by executing any of the following, depending on your preferred package manager:

```bash
pnpm add @igorskyflyer/keppo
```

```bash
yarn add @igorskyflyer/keppo
```

```bash
npm i @igorskyflyer/keppo
```

<br>
<br>

## 🤹🏼 API

There are 2 available constructors:

```ts
constructor(
  major: number,
  minor: number,
  patch: number,
  strict?: boolean,
  label?: string
)
```

`major: number` - major version number (default: `0`).

`minor: number` - minor version number (default: `0`).

`patch: number` - patch version number (default: `0`).

`strict?: boolean = true` - enables strict parsing mode (default: `true`).

`label?: string = ''` - optional label (e.g. `'alpha'`, `'beta.1'`), no dash prefix needed.

<br>

> Throws if any component is invalid or violates SemVer rules.  

<br>
<br>

```ts
constructor(version: string)
```

`version: string` - a valid SemVer string (e.g. `'1.2.3'`, `'v2.0.0-alpha'`).

<br>

> Throws if the string is invalid or fails SemVer parsing.

<br>
<br>

```ts
static VERSION: string
```

Returns the internal version of the Keppo engine.

<br>
<br>

```ts
static from(version: string, strict?: boolean): Keppo
```

Creates a new `Keppo` instance from a valid SemVer string.  
Equivalent to `new Keppo(...).setVersion(version)` but more fluent.

`version: string` - a valid SemVer string (e.g. `'1.2.3'`, `'v2.0.0-alpha'`).

`strict?: boolean` - optional flag to enable strict parsing mode.

<br>

> Throws if the version string is invalid.

Returns a fully initialized `Keppo` instance.

<br>
<br>

```ts
static isValid(version: string, isStrict: boolean = true): boolean
```

Checks whether a given string is a valid SemVer version.  
Useful for validating a version before calling `setVersion()` or instantiating a `Keppo` instance.

`version: string` - a SemVer string (e.g. `'1.2.3'`, `'v2.0.0-alpha'`)

`isStrict: boolean` - whether to enable strict parsing (default: `true`)

Returns `true` if the version is valid; otherwise `false`

<br>
<br>

```ts
setStrict(isStrict: boolean = true): Keppo
```

Sets the strict mode for SemVer parsing.  

When enabled, version strings must follow strict SemVer format (e.g. no `v` prefix).  
When disabled, relaxed formats like `v1.0.0` are accepted.  

`isStrict: boolean` - whether to enable strict mode (default: `true`)  

Returns the current `Keppo` instance.

<br>
<br>

```ts
increaseMajor(major: number = 1): Keppo
```

Increases the `major` version number by the specified amount.  
Resets the `minor` and `patch` components to `0` after incrementing.

`major: number = 1` - the amount to increase by (default: `1`)

<br>

> Throws if the value is invalid or exceeds safe integer limits.

<br>
<br>

```ts
increaseMinor(minor?: number = 1): Keppo
```

Increases the `minor` version number by the specified amount.  
Resets the `patch` component to `0` after incrementing.

`minor: number = 1` - the amount to increase by (default: `1`).

<br>

> Throws if the value is invalid or exceeds safe integer limits.

<br>
<br>

```ts
increasePatch(patch?: number = 1): Keppo
```

Increases the patch version number by the specified amount.

`patch: number = 1` - The amount to increase by (default: `1`).

<br>

> Throws if the value is invalid or exceeds safe integer limits.

<br>
<br>

```ts
decreaseMajor(major?: number = 1): Keppo
```

Decreases the major version number by the specified amount.  
Resets the minor and patch components to `0` after decrementing.

`major: number = 1` - the amount to decrease by (default: `1`).

<br>

> Throws if the value is invalid or results in a negative version.

<br>
<br>

```ts
decreaseMinor(minor?: number = 1): Keppo
```

Decreases the minor version number by the specified amount.  
Resets the patch component to `0` after decrementing.

`minor: number = 1` - the amount to decrease by (default: `1`).

<br>

> Throws an exception if the passed parameter is not valid.

<br>
<br>

```ts
decreasePatch(patch?: number = 1): Keppo
```

Decreases the patch version number by the specified amount.

`patch: number = 1` - the amount to decrease by (default: `1`).

<br>

> Throws if the value is invalid or results in a negative patch version.

<br>
<br>

```ts
setMajor(major: number): Keppo
```

Sets the major version number for the current Keppo instance.

`major: number ` - the major version as a number (e.g. `2`).

<br>

> Throws if the value is invalid, non-numeric, or negative.

<br>
<br>

```ts
setMinor(minor: number): Keppo
```

Sets the minor version number for the current `Keppo` instance.

`minor: number` - the minor version, as a number (e.g. `3`).

<br>

> Throws if the value is invalid, non-numeric, or negative.

<br>
<br>

```ts
setPatch(patch: number): Keppo
```

Sets the patch version number for the current `Keppo` instance.

`patch: number` - the patch version, as a number (e.g. `4`).

<br>

> Throws if the value is invalid, non-numeric, or negative.

<br>
<br>

```ts
setLabel(label: string): Keppo
```

Sets the version label for the current `Keppo` instance.  
The label will be appended to the version string with a dash (e.g. `'alpha'` → `0.1.0-alpha`).  
No need to include the dash manually.

`label: string` - a valid label string (e.g. `'alpha'`, `'beta.1'`).

<br>

> Throws if the label is invalid or fails pattern validation.

<br>
<br>

```ts
clearLabel(): Keppo
```

Clears the label of the current Keppo instance.

<br>
<br>

```ts
compareWith(version: Keppo): KeppoComparison
```

Compares the current `Keppo` version against another `Keppo` instance.  

For improved readability, use the `KeppoComparison` enum.

`version: Keppo` - another `Keppo` instance to compare against.

<br>

> Throws if the input is invalid.

Returns a value of `KeppoComparison` defined as:

- `-1` if the current version is older
- `0` if both versions are equal,
- `1` if the current version is newer.

<br>
<br>

```ts
enum KeppoComparison {
  Older = -1, // the current version is less than the compared version
  Current = 0, // both versions are equal
  Newer = 1 // the current version is greater than the compared version
}
```

Enum representing the result of a version comparison.  
Used by `compareWith()` to indicate whether the current version is older, equal to, or newer than the target version.

<br>
<br>

```ts
compareWith(version: string): KeppoComparison
```

Compares the current `Keppo` version against a SemVer string.  

For improved readability, use the `KeppoComparison` enum.

`version: string` - a valid SemVer string (e.g. `'1.2.3-beta.1'`) to compare against.

<br>

> Throws if the input is not a valid SemVer string.

Returns a value of `KeppoComparison` defined as:

- `-1` if the current version is older
- `0` if both versions are equal,
- `1` if the current version is newer.

<br>
<br>

```ts
output(): void
```

Prints to console the String representation of the current `Keppo` object.

<br>
<br>

<a id="set-version"></a>

```ts
setVersion(version: string): Keppo
```

Sets the current version for the `Keppo` instance.  
Replaces all existing version components and label with values parsed from the provided SemVer string.

<br>

> Throws an exception if the passed parameter is not valid or the passed parameter is not a valid SemVer version.

`version: string` - a valid SemVer string (e.g. `'1.2.3'`, `'v2.0.0-beta.1'`).

Throws if the string is invalid or fails SemVer parsing.

<br>
<br>

```ts
reset(): Keppo
```

Resets the current Keppo instance's SemVer version to `0.0.0` and label to an empty string.

<br>
<br>

```ts
toString(): string
```

Formats the current `Keppo` object as a String.

<br>
<br>

```ts
canIncreaseMajor(major: number = 1): boolean
```

Checks whether the major version can be safely increased by the given amount.  
Uses `Number.isSafeInteger()` to ensure the result stays within JavaScript's safe integer range.

`major: number = 1` - the amount to increase by (default: `1`).

Returns `true` if the increment is safe; otherwise `false`.

Read more about Integer safety on [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

<br>
<br>

```ts
canIncreaseMinor(minor: number = 1): boolean
```

Checks whether the minor version can be safely increased by the given amount.  
Uses `Number.isSafeInteger()` to ensure the result remains within JavaScript's safe integer range.

`minor: number = 1` - the amount to increase by (default: `1`).

Returns `true` if the increment is safe; otherwise `false`.

Read more about Integer safety on [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

<br>
<br>

```ts
canIncreasePatch(patch: number = 1): boolean
```

Checks whether the patch version can be safely increased by the given amount.  
Uses `Number.isSafeInteger()` to ensure the result remains within JavaScript's safe integer range.

`patch: number = 1` - the amount to increase by (default: `1`).

Returns `true` if the increment is safe; otherwise `false`.

Read more about Integer safety on [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

<br>
<br>

```ts
maxIncreaseMajor(): number
```

Returns the maximum safe value that can be used to increase the major version number.  
Based on JavaScript's `Number.MAX_SAFE_INTEGER`, which ensures arithmetic remains precise.

Read more about Integer safety on [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

<br>
<br>

```ts
maxIncreaseMinor(): number
```

Returns the maximum safe value that can be used to increase the minor version number.  
Based on JavaScript’s `Number.MAX_SAFE_INTEGER`, ensuring arithmetic remains precise.

Read more about Integer safety on [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

<br>
<br>

```ts
maxIncreasePatch(): number
```

Returns the maximum safe value that can be used to increase the patch version number.  
Based on JavaScript’s `Number.MAX_SAFE_INTEGER`, ensuring arithmetic remains precise.

<br>
<br>

## 🗒️ Examples


```ts
import { Keppo } from '@igorskyflyer/keppo'

new Keppo(1, 0, 0).toString() // returns '1.0.0'
new Keppo(1, 0, 0, true, 'alpha').toString() // returns '1.0.0-alpha'
new Keppo('1.0.0').increaseMajor(2).toString() // returns '3.0.0'
new Keppo(1, 0, 0).compareWith('2.0.0') // returns  -1
new Keppo('1.0.32').maxIncreasePatch() // returns 9007199254740959
new Keppo('1.0.1').canIncreasePatch(1) // returns true
// static method
Keppo.isValid('v1.0.0', false) //returns true
Keppo.isValid('v1.0.0') // returns false
```

<br>
<br>

## 📝 Changelog

📑 The changelog is available here, [**CHANGELOG**](https://github.com/igorskyflyer/npm-keppo/blob/main/CHANGELOG.md).

<br>
<br>

## 🪪 License

Licensed under the [**MIT license**](https://github.com/igorskyflyer/npm-keppo/blob/main/LICENSE).

<br>
<br>

## 💖 Support

<div align="center">
  I work hard for every project, including this one and your support means a lot to me!
  <br>
  Consider buying me a coffee. ☕
  <br>
  <br>
  <a href="https://ko-fi.com/igorskyflyer" target="_blank"><img src="https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/ko-fi.png" alt="Donate to igorskyflyer" width="180" height="46"></a>
  <br>
  <br>
  <em>Thank you for supporting my efforts!</em> 🙏😊
</div>

<br>
<br>

## 🧬 Related

[**@igorskyflyer/common-color**](https://www.npmjs.com/package/@igorskyflyer/common-color)

> _🎨 Provides common Color-related TypeScript types. 🌈_

<br>

[**@igorskyflyer/rawelement**](https://www.npmjs.com/package/@igorskyflyer/rawelement)

> _🐯 A utility that lets you manipulate HTML elements, their attributes and innerHTML as strings, on the go and then render the modified HTML. Very useful in SSG projects. 💤_

<br>

[**@igorskyflyer/str-is-in**](https://www.npmjs.com/package/@igorskyflyer/str-is-in)

> _🧵 Provides ways of checking whether a String is present in an Array of Strings using custom Comparators. 🔍_

<br>

[**@igor.dvlpr/recursive-readdir**](https://www.npmjs.com/package/@igor.dvlpr/recursive-readdir)

> _📖 Provides recursive readdir() and readdirSync() functions. 📁_

<br>

[**@igorskyflyer/clone**](https://www.npmjs.com/package/@igorskyflyer/clone)

> _🧬 A lightweight JavaScript utility allowing deep copy-by-value of nested objects, arrays and arrays of objects. 🪁_

<br>
<br>
<br>

## 👨🏻‍💻 Author
Created by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
