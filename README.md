## `🎡 Keppo(1.x.x) 🧮`

<sub>🎡 Parse, manage, compare and output SemVer-compatible version numbers. 🧮</sub>

<br>

Install it by running

```shell
npm i "@igor.dvlpr/keppo"
```

<br>

### API

There are 2 available constructors:

```ts
constructor(major?: number = 0, minor?: number = 0, patch?: number = 0, strict?: boolean = true, label?: string  = '')
```

`major?: number = 0` -> major version number,

`minor?: number = 0` => minor version number,

`patch?: number = 0` => patch version number,

`strict?: boolean = true` => determines whether the parsing should be strict or not, i.e. use `v` as prefix, e.g. `v1.0.0`,

`label?: string = ''` => label for the version, no need to prefix with a dash.

and

```ts
constructor(version: string)
```

`version: string` => a valid SemVer version string, either in strict or non-strict format, i.e. `1.0.0` or `v1.0.0`, strict mode is inferred from the input string.

If any of the parameters in either constructor is not valid, it will throw an appropriate error.

<br>
<br>

```ts
parse(version: string): Keppo;
```

Parses the provided string as a SemVer version.

`version: string` => A valid SemVer version represented as a string, e.g. `"1.2.3"`, `"v1.5.3"`, `"2.3.4-alpha"`, `"v2.4.6-beta"`.

Throws an exception if the passed parameter is not valid.

Returns a new instance of `Keppo` with the parsed version.

<br>
<br>

```ts
  isStrict(isStrict?: boolean = true): Keppo
```

Sets the strict mode for the SemVer version, i.e. allow `v` as a prefix for SemVer, e.g. `v1.0.0`. By default, strict mode is `true`.

<br>
<br>

```ts
 increaseMajor(major?: number = 1): Keppo
```

Increases the major version number for the provided value.

`major: number = 1` => The major version number to increase by, defaults to `1`.

Throws an exception if the passed parameter is not valid.

<br>
<br>

```ts
increaseMinor(minor?: number = 1): Keppo
```

Increases the minor version number for the provided value.

`minor: number = 1` => The minor version number to increase by, defaults to `1`.

Throws an exception if the passed parameter is not valid.

<br>
<br>

```ts
increasePatch(patch?: number = 1): Keppo
```

Increases the patch version number for the provided value.

`patch: number = 1` => The patch version number to increase by, defaults to `1`.

Throws an exception if the passed parameter is not valid.

<br>
<br>

```ts
 decreaseMajor(major?: number = 1): Keppo
```

decreases the major version number for the provided value.

`major: number = 1` => The major version number to decrease by, defaults to `1`.

Throws an exception if the passed parameter is not valid.

<br>
<br>

```ts
decreaseMinor(minor?: number = 1): Keppo
```

decreases the minor version number for the provided value.

`minor: number = 1` => The minor version number to decrease by, defaults to `1`.

Throws an exception if the passed parameter is not valid.

<br>
<br>

```ts
decreasePatch(patch?: number = 1): Keppo
```

decreases the patch version number for the provided value.

`patch: number = 1` => The patch version number to decrease by, defaults to `1`.

Throws an exception if the passed parameter is not valid.

<br>
<br>

```ts
setMajor(major: number | string): Keppo
```

Sets the major version number for the current Keppo instance.

`major: number | string` => The major version number, either as a number or as a string.

Throws an exception if the passed parameter is not valid.

<br>
<br>

```ts
setMinor(minor: number | string): Keppo
```

Sets the minor version number for the current Keppo instance.

`minor: number | string` => The minor version number, either as a number or as a string.

Throws an exception if the passed parameter is not valid.

<br>
<br>

```ts
setPatch(patch: number | string): Keppo
```

Sets the patch version number for the current Keppo instance.

`patch: number | string` => The patch version number, either as a number or as a string.

Throws an exception if the passed parameter is not valid.

<br>
<br>

```ts
setLabel(label: string): Keppo
```

Sets the version label for the current Keppo instance. No need to prefix with a dash "`-`", i.e. "`alpha`" and its output would be `0.1.0-alpha`.

Throws an exception if the passed parameter is not valid.

<br>
<br>

```ts
compare(version: Keppo | string): number
```

Compares the current `Keppo` SemVer-compatible version with a provided one. The passed argument can either be another instance of `Keppo` or a valid SemVer string.

Returns a value defined as:

- `-1` if the current instance version is less than the provided version,
- `0` if the compared versions are equal,
- `1` if the current instance version is greater than the provided version.

<br>
<br>

```ts
output(): void
```

Prints to console the String representation of the current `Keppo` object.

<br>
<br>

```ts
setVersion(version: string): Keppo
```

Sets the current Keppo version. The passed value must be a valid SemVer string. This will replace all the previous version information.

Throws an exception if the passed parameter is not valid or the passed parameter is not a valid SemVer version.

<br>
<br>

```ts
toString(): string
```

Formats the current `Keppo` object as a String.

<br>
<br>

## Usage

```js
const { Keppo } = require('@igor.dvlpr/keppo')

new Keppo(1, 0, 0).toString() // returns '1.0.0'
new Keppo(1, 0, 0, true, 'alpha').toString() // returns '1.0.0-alpha'
new Keppo('1.0.0').increaseMajor(2).toString() // returns '3.0.0'
new Keppo(1, 0, 0).compare('2.0.0') // returns  -1
```
