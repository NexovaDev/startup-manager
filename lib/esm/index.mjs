import * as Registry from './registry.mjs';

/**
 * @example import * as StartupManager from 'startup-manager';

			// Creates the startup key
			console.log(StartupManager.Create('SomeAppName', 'C:\\Path\\To\\App\\app.exe', ['--SomeArgument']));
	* @since 1.0.0
	* @param { string } name
	* @param { string } path
	* @param { string[] } args
	* @returns { ResultObject }
*/
export function Create(name, path, args) {
	const item = Registry.set(Registry.startupPaths.list, name, `\\"${path}\\" ${args.join(' ')}`);
	const status = Registry.set(Registry.startupPaths.status, name, '020000000000000000000000', 'REG_BINARY');

	if (item?.failed) return item;
	if (status?.failed) return status;
	return { failed: false, error: null };
}

/**
 * @example import * as StartupManager from 'startup-manager';

			// Returns the status as an object
			console.log(StartupManager.Status('SomeAppName'));
	* @since 1.0.0
	* @param { string } name
	* @returns { object }
*/
export function Status(name) {
	const item = Registry.get(Registry.startupPaths.list, name)?.[name];
	const status = Registry.get(Registry.startupPaths.status, name)?.[name]?.value?.slice(0, 2)?.split('')?.reduce((a, b) => Number(a) + Number(b));

	if (item?.failed) return item;
	if (status?.failed) return status;
	if (!item) {
		return { exists: false, status: null };
	} else if (status == 2) {
		return { exists: true, status: 'ENABLED' };
	} else if (status > 2) {
		return { exists: true, status: 'DISABLED' };
	} else {
		return { exists: true, status: 'UNKNOWN' };
	}
}

/**
 * @example import * as StartupManager from 'startup-manager';

			// Enables the startup key
			console.log(StartupManager.Enable('SomeAppName'));
	* @since 1.0.0
	* @param { string } name
	* @returns { ResultObject }
*/
export function Enable(name) {
	const status = this.Status(name);

	if (status?.failed) return status;
	if (status.exists && status.status !== 'ENABLED') {
		return Registry.set(Registry.startupPaths.status, name, '020000000000000000000000', 'REG_BINARY');
	}
}

/**
 * @example import * as StartupManager from 'startup-manager';

			// Disables the startup key
			console.log(StartupManager.Disable('SomeAppName'));
	* @since 1.0.0
	* @param { string } name
	* @returns { ResultObject }
*/
export function Disable(name) {
	const status = this.Status(name);

	if (status?.failed) return status;
	if (status.exists && status.status !== 'DISABLED') {
		return Registry.set(Registry.startupPaths.status, name, '0300000038303038356C6F6C', 'REG_BINARY');
	}
}

/**
 * @example import * as StartupManager from 'startup-manager';

			// Delete the startup key
			console.log(StartupManager.Delete('SomeAppName'));
	* @since 1.0.0
	* @param { string } name
	* @returns { ResultObject }
*/
export function Delete(name) {
	const status = this.Status(name);

	if (status?.failed) return status;
	if (status.exists) {
		const deleteItem = Registry._delete(Registry.startupPaths.list, name);
		const deleteStatus = Registry._delete(Registry.startupPaths.status, name);

		if (deleteItem?.failed) return deleteItem;
		if (deleteStatus?.failed) return deleteStatus;

		return { failed: false, error: null };
	}
}