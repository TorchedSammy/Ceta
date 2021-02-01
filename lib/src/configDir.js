const fs = require('fs');

// The ConfigDir class gives a platform-agnostic way to manage program data directories.
class ConfigDir {
	constructor(folderName) {
		if (!!ConfigDir.instance) return ConfigDir.instance;

		ConfigDir.instance = this;
		this.folderName = folderName;

		return this;
	}

	// Checks if our config directory exists.
	exists() {
		if (!fs.existsSync(this.platformPath())) {
			return false;
		}

		return true;
	}

	// Gets the path to the config directory for the current platform
	platformPath() {
		switch(process.platform) {
			case 'win32':
				return this._windowsDir
				break;

			case 'linux':
				return this._linuxDir
				break;
		}
	}

	// Getters for config folders for different OSes
	
	// Windows
	get _windowsDir() { return `${process.env.APPDATA}\\${this.folderName}`}

	// Linux
	get _linuxDir() { return `${require('os').homedir()}/.config/${this.folderName}`}

	// Mac OS
	// TODO
}

module.exports = ConfigDir;
