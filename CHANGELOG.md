# 📒 Changelog

### of [@igorskyflyer/keppo](https://github.com/igorskyflyer/npm-keppo)

<br>

## v2.0.0 (*16-Sep-2025*)

- **❌ BREAKING**: remove the `parse()` method - use the `constructor` or the new static `Keppo.from()` function instead
- **❌ BREAKING**: rename `compare()` to `compareWith()` for semantic clarity

<br>

- **✨ feat**: changes to the `major` or `minor` component now auto-reset the lower components (`minor` / `patch`)
- **✨ feat**: add a static instantiation helper `Keppo.from()`
- **✨ feat**: add the `clearLabel()` method
- **✨ feat**: add the `reset()` method - resets the `version` to `0.0.0` and `label` to a blank string

<br>

- **✅ fix**: handle negative `version` components properly
- **✅ fix**: throw narrower `Error` types
- **✅ fix**: improve SemVer `label` handling
- **✅ fix**: correctly set the `label` in the constructor
- **✅ fix**: handle empty labels gracefully
- **✅ fix**: remove redundant conversions of `version` strings to `String`s

<br>

- **💻 dev**: unify error formatting
- **💻 dev**: add overloads for the constructor
- **💻 dev**: use the fluent, chainable API internally
- **💻 dev**: add a static library version string
- **💻 dev**: add `KeppoComparison` enum to be used as the result of `compareWith()`
- **💻 dev**: upgrade Node to >= v22
- **💻 dev**: upgrade dependencies
- **💻 dev**: update all tests to use the new API
- **💻 dev**: add tests for new methods
