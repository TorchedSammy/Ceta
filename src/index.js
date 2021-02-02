const blessed = require('blessed');
const ceta = require('../lib');

const screen = blessed.screen({
  smartCSR: true,
  title: 'Ceta - Menu'
});

const menuItems = [
	"Manage Mods",
	"Download SMAPI",
	"Check for Updates",
	"About",
	"Exit"
];
const infotexts = [
	'Opens the menu to manage Stardew Valley mods.',
	'Downloads the latest version of SMAPI and runs the installer.',
	'Checks if a new version has been published.',
	'Shows info about the running version of Ceta.',
	'Exits Ceta.'
];

const menu = blessed.list({
	parent: screen,
	top: `75%-${menuItems.length}`,
	left: `center`,
	width: '15%',
	keys: true,
	mouse: true,
	items: menuItems,
	align: 'center',
	style: {
		fg: 'blue',
		selected: {
			bg: 'blue',
			fg: 'white'
		},
		bold: true,
		scrollbar: {
			bg: 'blue'
		},
		focus: {
			bg: 'red'
		},
		hover: {
			bg: 'red'
		}
	}
});

const name = blessed.text({
	parent: screen,
	top: 17,
	left: 'center',
	content: 'Ceta'
});

const version = blessed.text({
	parent: screen,
	top: 18,
	left: 'center',
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
		type: 'line'
	},
	style: {
		border: {
			fg: 'cyan'
		}
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
