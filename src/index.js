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
	left: `50%-9`,
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
	top: 18,
	left: '50%',
	content: 'Ceta'
});

const version = blessed.text({
	parent: screen,
	top: 19,
	left: '50%-5',
	content: `Version ${ceta.util.version}`
});

blessed.ansiimage({
	parent: screen,
	top: 2,
	left: `50%-13`,
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

menu.on('highlight', (_, n) => {
	infotext.setContent(ceta.util.infoText(infotexts[n]))
});

screen.key(['C-c'], () => {
	process.exit();
});

screen.render();
