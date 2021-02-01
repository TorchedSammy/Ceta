// CetaGlobal class manages a global state for Ceta.
// Because we don't want to use `global`.
class CetaGlobal {
	constructor() {
		if (!!CetaGlobal.instance) return CetaGlobal.instance;

		CetaGlobal.instance = this;

		return this;
	}
}

module.exports = CetaGlobal;
