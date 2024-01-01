const Registry = require('./registry.js');

module.exports = {
	/**
	   * @example const StartupManager = require('startup-manager');

				// Creates the startup key
				console.log(StartupManager.Create('SomeAppName', 'C:\\Path\\To\\App\\app.exe', ['--SomeArgument']));
	 * @since 1.0.0
	 * @param { string } name
	 * @param { string } path
	 * @param { string[] } args
	 * @returns { ResultObject }
	*/
	Create: (name, path, args) => {
		const item = Registry.set(Registry.startupPaths.list, name, `\\"${path}\\" ${args.join(' ')}`);
		const status = Registry.set(Registry.startupPaths.status, name, '020000000000000000000000', 'REG_BINARY');

		if (item?.failed) return item;
		if (status?.failed) return status;
		return { failed: false, error: null };
	},
	/**
	   * @example const StartupManager = require('startup-manager');

				// Returns the status as an object
				console.log(StartupManager.Status('SomeAppName'));
	 * @since 1.0.0
	 * @param { string } name
	 * @returns { StatusObject }
	*/
	Status: (name) => {
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
	},
	/**
	   * @example const StartupManager = require('startup-manager');

				// Enables the startup key
				console.log(StartupManager.Enable('SomeAppName'));
	 * @since 1.0.0
	 * @param { string } name
	 * @returns { ResultObject }
	*/
	Enable: function(name) {
		const status = this.Status(name);

		if (status?.failed) return status;
		if (status.exists && status.status !== 'ENABLED') {
			return Registry.set(Registry.startupPaths.status, name, '020000000000000000000000', 'REG_BINARY');
		}
	},
	/**
	   * @example const StartupManager = require('startup-manager');

				// Disables the startup key
				console.log(StartupManager.Disable('SomeAppName'));
	 * @since 1.0.0
	 * @param { string } name
	 * @returns { ResultObject }
	*/
	Disable: function(name) {
		const status = this.Status(name);

		if (status?.failed) return status;
		if (status.exists && status.status !== 'DISABLED') {
			return Registry.set(Registry.startupPaths.status, name, '0300000038303038356C6F6C', 'REG_BINARY');
		}
	},
	/**
	   * @example const StartupManager = require('startup-manager');

				// Delete the startup key
				console.log(StartupManager.Delete('SomeAppName'));
	 * @since 1.0.0
	 * @param { string } name
	 * @returns { ResultObject }
	*/
	Delete: function(name) {
		const status = this.Status(name);

		if (status?.failed) return status;
		if (status.exists) {
			const deleteItem = Registry.delete(Registry.startupPaths.list, name);
			const deleteStatus = Registry.delete(Registry.startupPaths.status, name);

			if (deleteItem?.failed) return deleteItem;
			if (deleteStatus?.failed) return deleteStatus;

			return { failed: false, error: null };
		}
	},
};