const blessed = require('blessed');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const json5 = require('json5');
const ceta = require('../../lib');
const scannedMods = new Map();

const screen = blessed.screen({
  smartCSR: true,
  title: 'Ceta - Manager'
});

const modlist = blessed.list({
	parent: screen,
	width: '99%',
	height: '95%',
	left: 'center',
	keys: true,
	mouse: true,
	label: 'Ceta Manager',
	content: 'Scanning for mods...',
	align: 'center',
	style: {
		fg: 'blue',
		selected: {
			bg: 'blue',
			fg: 'white'
		},
		bold: true,
		scrollbar: {
			fg: 'blue'
		}
	},
	border: {
		type: 'line',
		fg: 'cyan'
	}
});

const modsetbtn = blessed.button({
	parent: screen,
	top: '97%',
	width: '7%',
	left: '1%',
	shrink: true,
	keys: true,
	mouse: true,
	name: 'modsets',
	content: '[ Modsets ]',
	style: {
		fg: 'cyan',
		focus: {
			bg: 'cyan',
			fg: 'white'
		}
	}
});

modsetbtn.on('press', () => {
	
});

/*scanbutton.on('press', () => {
	// TODO
});*/

screen.key(['C-c'], () => {
	process.exit();
});
screen.key(['tab'], () => {
	modlist.focused ? modsetbtn.focus() : modlist.focus();
});
modlist.focus();

screen.render();

glob(path.resolve(`${ceta.util.gameDir.replace(/^\\/, '/')}/Mods/**/*/manifest.json`), {strict: false, silent: true, nodir: true}, (err, paths) => {
	for (let manifestpath of paths) {
		const manifestfile = fs.readFileSync(manifestpath, 'utf8');
		const manifest = json5.parse(manifestfile)
		scannedMods.set(manifest.UniqueID, {
			name: manifest.Name,
			version: manifest.Version,
			description: manifest.Description
		});
		modlist.add(manifest.Name)		
	}
	screen.render()
});
