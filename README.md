[![version](https://img.shields.io/npm/v/startup-manager?color=blueviolet&style=for-the-badge "Version")](https://github.com/NexovaDev/startup-manager/releases/latest)
‎
[![weekly_downloads](https://img.shields.io/npm/dw/startup-manager?color=blue&style=for-the-badge "Weekly Downloads")](https://www.npmjs.com/package/startup-manager#:~:text=Weekly%20Downloads)
‎
![downloads](https://img.shields.io/npm/dt/startup-manager?style=for-the-badge&logo=npm&color=%23ca0000&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fstartup-manager "Downloads")
‎
[![issues](https://img.shields.io/github/issues/NexovaDev/startup-manager?style=for-the-badge "Issues")](https://github.com/NexovaDev/startup-manager/issues)
‎
[![license](https://img.shields.io/github/license/NexovaDev/startup-manager?color=important&style=for-the-badge "License")](https://github.com/NexovaDev/startup-manager/blob/master/LICENSE)
‎
[![startup-manager](https://nodei.co/npm/startup-manager.png "startup-manager on NPM")](https://www.npmjs.com/package/startup-manager)
---

# Startup Manager
An easy way to manage startup apps in NodeJS.

---

# Changelog (`v1.0.0`)

• Initial release

---

# Installation

```sh-session
npm i startup-manager
```

---

# Usage

> ⚠ **This library is ONLY compatible with node version 14 and above! Only supports Windows at the moment**

First, you must import the library using the following code:
```javascript
const StartupManager = require('startup-manager');
// or `import * as StartupManager from 'startup-manager';` for ESM users
```
\
You can use the following functions with this library, more usage info available in the parameters section
```javascript
const StartupManager = require('startup-manager');
// or `import * as StartupManager from 'startup-manager';` for ESM users

// Creates the startup key
console.log(StartupManager.Create('SomeAppName', 'C:\\Path\\To\\App\\app.exe', ['--SomeArgument']));

// Returns the status as an object
console.log(StartupManager.Status('SomeAppName'));

// Disables the startup key
console.log(StartupManager.Disable('SomeAppName'));

// Should return { exists: true, status: 'DISABLED' }
console.log(StartupManager.Status('SomeAppName'));

// Enables the startup key
console.log(StartupManager.Enable('SomeAppName'));

// Should return { exists: true, status: 'ENABLED' }
console.log(StartupManager.Status('SomeAppName'));

// Delete the startup key
console.log(StartupManager.Delete('SomeAppName'));

// Should return { exists: false, status: null } now
console.log(StartupManager.Status('SomeAppName'));
```

# Parameters
### Parameters info for all of the functions

| Function | Parameters | Description | Return value |
|----------|------------|-------------|--------------|
| `Create` | name: string, path: string, args: string[] | Creates an enabled startup key | ResultObject (object) |
| `Delete` | name: string | Deletes a startup key | ResultObject (object) |
| `Enable` | name: string | Enables a disabled startup key | ResultObject (object) |
| `Disable` | name: string | Disables a enabled startup key | ResultObject (object) |
| `Status` | name: string | Gets the status of a startup key | StatusObject (object) |

### Objects
| Name | Format |
|----------|------------|
| `ResultObject` | `{ failed: Boolean, error: null \| Error }` |
| `StatusObject` | `{ exists: Boolean, status: 'ENABLED' \| 'DISABLED' \| 'UNKNOWN' \| null }` |

#
[![](assets/backToTop.png?raw=true "Back to top")](#readme)
