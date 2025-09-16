# 📒 Changelog

### of [@igorskyflyer/keppo](https://github.com/igorskyflyer/npm-keppo)

<br>

## v2.0.0 (*16-Sep-2025*)

- **❌ BREAKING**: remove the `parse()` method - use the `constructor` or the new static `Keppo.from()` function instead
- **❌ BREAKING**: rename `compare()` to `compareWith()` for semantic clarity

<br>

- **✨ feat**: auto-reset lower components (`minor` / `patch`) when `major` or `minor` changes
- **✨ feat**: align `SemVer` RegExp with **full** specification compliance
- **✨ feat**: add a static instantiation helper `Keppo.from()`
- **✨ feat**: `compareWith()` now returns `KeppoComparison` enum (`Older` = -1, `Current` = 0, `Newer` = 1) instead of raw numbers
- **✨ feat**: add the `clearLabel()` method
- **✨ feat**: add the `reset()` method - resets the `version` to `0.0.0` and `label` to a blank string

<br>

- **✅ fix**: improve RegExp performance
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
- **💻 dev**: update all JSDocs
- **💻 dev**: update all tests to use the new API
- **💻 dev**: add tests for new methods
