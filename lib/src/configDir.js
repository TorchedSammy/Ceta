const fs = require('fs');
const path = require('path');

// The ConfigDir class gives a platform-agnostic way to manage program data directories.
class ConfigDir {
	constructor(folderName, configName) {
		if (!!ConfigDir.instance) return ConfigDir.instance;

		ConfigDir.instance = this;
		this.folderName = folderName;
		this.configName = configName;

		return this;
	}

	// Checks if our config directory exists.
	exists() {
		if (!fs.existsSync(this.platformPath())) {
			return false;
		}

		return true;
	}

	configExists() {
		if (!fs.existsSync(this.configPath())) {
			return false;
		}

		return true;
	}

	configPath() {
		return path.join(this.platformPath(), this.configName);
	}

	// Gets the path to the config directory for the current platform
	platformPath() {
		switch(process.platform) {
			case 'win32':
				return this._windowsDir
				break;

			case 'linux':
			case 'darwin':
				return this._unixDir
				break;
		}
	}

	// Getters for config folders for different OSes

	// Windows
	get _windowsDir() { return `${process.env.APPDATA}\\${this.folderName}`}

	// Unix (Linux & MacOS)
	get _unixDir() { return `${require('os').homedir()}/.config/${this.folderName}`}
}

module.exports = ConfigDir;
