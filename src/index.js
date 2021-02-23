const blessed = require('blessed');
const ceta = require('../lib');
const fs = require('fs');
const cfgdir = new ceta.ConfigDir('Ceta', 'settings.json');

if (!cfgdir.exists()) fs.mkdirSync(cfgdir.platformPath());
if (!cfgdir.configExists()) fs.writeFileSync(cfgdir.configPath(), JSON.stringify(require('../defaultSettings'), null, 4));

const screen = blessed.screen({
  smartCSR: true,
  title: 'Ceta - Menu'
});

const menuItems = [
	"Manage Mods",
	"Download SMAPI",
	"Check for Updates",
	"Options",
	"About",
	"Exit"
];
const infotexts = [
	'Opens the menu to manage Stardew Valley mods.',
	'Downloads the latest version of SMAPI and runs the installer.',
	'Checks if a new version has been published.',
	'Configure Ceta\'s settings.',
	'Shows info about the running version of Ceta.',
	'Exits Ceta.'
];

const menu = blessed.list({
	parent: screen,
	top: `80%-${menuItems.length}`,
	left: `center`,
	width: '15%',
	keys: true,
	mouse: true,
	items: menuItems,
	align: 'center',
	style: {
		fg: 'cyan',
		selected: {
			bg: 'cyan',
			fg: 'white'
		},
		bold: true
	}
});

const name = blessed.text({
	parent: screen,
	top: '94%',
	left: '1%',
	content: 'Ceta'
});

const version = blessed.text({
	parent: screen,
	top: '96%',
	left: '1%',
	content: `Version ${ceta.util.version}`
});

const whale = blessed.ansiimage({
	parent: screen,
	top: 1,
	left: `center`,
	file: 'whale.png',
	width: 25,
	height:  15
});

const infotext = blessed.text({
	parent: screen,
	top: '98%',
	left: '1%',
	content: ceta.util.infoText(infotexts[0]),
	align: 'center'
});

const aboutscreen = blessed.box({
	parent: screen,
	left: 'center',
	hidden: true,
	width: '25%',
	border: {
		type: 'line',
		fg: 'cyan'
	}
});
const abouttext = blessed.text({
	parent: aboutscreen,
	top: '40%',
	left: 'center',
	width: '90%',
	content: `
Ceta v${ceta.util.version}
Command line Stardew Valley mod manager.

Scanned Mods: N/A

~~~~~~~~~~~~~~~~~~
Created by: TorchedSammy
(https://sammy.is-a.dev)
	`,
	align: 'center'
});

menu.on('highlight', (_, n) => {
	infotext.setContent(ceta.util.infoText(infotexts[n]))
});

menu.on('select', (i) => {
	switch(i.content) {
		case 'Manage Mods':
			require('./menus/manager');
			screen.destroy()
		case 'About':
			aboutscreen.append(whale);
			aboutscreen.show();
			screen.render()
			break;
		case 'Exit':
			process.exit();
			break;
	}
})

screen.key(['C-c'], () => {
	process.exit();
});
screen.key(['escape'], () => {
	screen.append(whale);
	aboutscreen.hide();
	screen.render()
});

screen.render();
