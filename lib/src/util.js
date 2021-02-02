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
}

module.exports = CetaUtil;
