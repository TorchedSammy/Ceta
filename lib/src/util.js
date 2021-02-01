// CetaUtil class has useful utility functions.
class CetaUtil {
	static infoText(text) {
		return `ℹ ${text} (Ctrl+I for more details.)`
	}

	static get version() {
		return require('../../package.json').version;
	}
}

module.exports = CetaUtil;
