const ceta = require('./lib');
const cfgdir = new ceta.ConfigDir();
const path = require('path')

module.exports = {
	modsetPath: path.join(cfgdir.platformPath(), 'Modsets'),
	nexusKey: 'NEXUS_API_KEY_HERE',
	gameDirectory: ceta.util.gameDir()
}