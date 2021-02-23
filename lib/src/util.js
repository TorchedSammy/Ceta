const ConfigDir = require('./configDir');
const cfgdir = new ConfigDir('Ceta', 'settings.json');

// CetaUtil class has useful utility functions.
class CetaUtil {
	static infoText(text) {
		return `ℹ ${text} (Ctrl+I for more details.)`
	}

	static get version() {
		return require('../../package.json').version;
	}

	static get config() {
		return require(`${cfgdir.configPath()}`)
	}

	static gameDir(raw) {
		switch(process.platform) {
			case 'win32':
				return 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Stardew Valley'
				break;
			case 'linux':
				let path = '~/.local/share/Steam/steamapps/common/Stardew Valley'
				if (!raw) path = path.replace('~', require('os').homedir())

				return path;
				break;
		}
	}
}

module.exports = CetaUtil;
