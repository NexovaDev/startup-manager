const childProcess = require('child_process');

module.exports = {
	get: (path, key) => {
		try {
			const output = childProcess.execSync(`REG QUERY "${path}" ${key ? '/v "' + key + '"' : ''} /s`).toString();
			// Split the input string by line breaks
			const lines = output.split('\r');

			// Remove empty lines
			const nonEmptyLines = lines.filter(line => line.trim() !== '');

			// Initialize an object to store the result
			let result = {};

			// Process each line to construct the object
			nonEmptyLines.forEach(line => {
				if (!line.startsWith('HKEY_')) {
					// This line contains data for the current key
					const [name, type, value] = line.split(/\s{2,}/).filter(item => item !== '');
					result[name] = { type, value };
				}
			});

			result = Object.fromEntries(
				// eslint-disable-next-line no-unused-vars
				Object.entries(result).filter(([_, value]) => value.type !== undefined),
			);

			return result;
		} catch (err) {
			return { failed: true, error: err };
		}
	},
	set: (path, key, value, type) => {
		if (!type) type = 'REG_SZ';
		try {
			childProcess.execSync(`REG ADD "${path}" /v "${key}" /t ${type} /d "${value}" /f`).toString();
			return { failed: false, error: null };
		} catch (err) {
			return { failed: true, error: err };
		}
	},
	delete: (path, key) => {
		try {
			childProcess.execSync(`REG DELETE "${path}" /v "${key}" /f`).toString();
			return { failed: false, error: null };
		} catch (err) {
			return { failed: true, error: err };
		}
	},
	startupPaths: {
		list: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
		status: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartupApproved\\Run',
	},
};