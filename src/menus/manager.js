const blessed = require('blessed');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const json5 = require('json5');
const cp = require('child_process');
const ceta = require('../../lib');
const scannedMods = new Map();

const screen = blessed.screen({
  smartCSR: true,
  title: 'Ceta - Manager',
  debug: true
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

const btns = blessed.listbar({
	parent: screen,
	top: '97%',
	width: '100%',
	left: '1%',
	shrink: true,
	keys: true,
	mouse: true,
	items: {
		' Rescan': {callback: () => {
			modlist.clearItems();
			screen.render()
			scan()
		}}
	},
	style: {
		item: {
			fg: 'cyan'
		},
		selected: {
			bg: 'cyan',
			fg: 'white'
		}
	}
});

const singlemanage = blessed.box({
	parent: screen,
	left: 'center',
	top: 'center',
	width: '50%',
	height: '32%',
	keys: true,
	mouse: true,
	hidden: true,
	style: {
		fg: 'cyan'
	},
	border: {
		type: 'line',
		fg: 'cyan'
	}
});

const togglebtn = blessed.button({
	parent: singlemanage,
	top: '74%',
	left: '2%',
	width: '14%',
	shrink: true,
	keys: true,
	mouse: true,
	content: '[ Disable ]',
	style: {
		fg: 'cyan',
		focus: {
			fg: 'cyan',
			bg: 'white'
		}
	}
});

togglebtn.on('press', () => {
	togglebtn.setContent(togglebtn.content === '[ Enable ]' ? '[ Disable ]' : '[ Enable ]');
});

modlist.on('select', (i) => {
	const mod = [...scannedMods].find(([_, m]) => m.name === i.content.replace('[-] ', ''))[1];
	singlemanage.setText(`
${mod.name}:
${mod.description || 'No Description.'}

Version: ${mod.version}
`)

	togglebtn.focus()
	togglebtn.setContent(!mod.disabled ? '[ Disable ]' : '[ Enable ]');
	singlemanage.toggle()
	screen.render()
});

screen.key(['C-c'], () => {
	process.exit();
});
screen.key(['tab'], () => {
	if (!singlemanage.focused) modlist.focused ? btns.focus() : modlist.focus();
});
screen.key(['escape'], () => {
	let key;
	if (!singlemanage.hidden) {
		screen.debug('pre')
		const mod = [...scannedMods].find(([k, m]) => {
			key = k;
			return m.name === modlist.items[modlist.selected].content.replace('[-] ', '');
		})[1];
		const modmap = scannedMods.get(key);
		const btndisabled = togglebtn.content === '[ Enable ]' ? true : false;
		if (btndisabled && !mod.disabled && !mod.folderName.startsWith('.')) {
			try {
			fs.renameSync(mod.path, path.join(path.join(ceta.util.gameDir(), 'Mods'), `.${mod.folderName}`));

			modlist.items[modlist.selected].content = `[-] ${modlist.items[modlist.selected].content}`;
			modmap.folderName = `.${mod.folderName}`;
			modmap.path = path.join(path.join(ceta.util.gameDir(), 'Mods'), mod.folderName);
			modmap.disabled = true;
		} catch(e) {
			screen.debug(e.message);
		}

			screen.debug('disabling');
		}
		if (!btndisabled && mod.disabled && mod.folderName.startsWith('.')) {
			try {
			fs.renameSync(mod.path, path.join(path.join(ceta.util.gameDir(), 'Mods'), mod.folderName.slice(1)));
			modlist.items[modlist.selected].content = modlist.items[modlist.selected].content.slice(4);
			modmap.folderName = mod.folderName.slice(1);
			modmap.path = path.join(path.join(ceta.util.gameDir(), 'Mods'), mod.folderName)
			modmap.disabled = false
			} catch(e) {
			screen.debug(e.message);
		}
			screen.debug('enabling');
		}
	}

	singlemanage.hide();
	modlist.focus();
	screen.render();
});
modlist.focus();

screen.render();
scan();

function scan() {
	glob(path.resolve(`${ceta.util.gameDir().replace(/^\\/, '/')}/Mods/**/{,.}*[!.]/manifest.json`), {strict: false, silent: true, nodir: true}, (err, paths) => {
		for (let manifestpath of paths) {
			const regex = /^(.*[\\\/])(.*)$/;
			const match = regex.exec(manifestpath);
			const modfolder = regex.exec(match[1].substring(0, match[1].length -1))[2]

			const manifestfile = fs.readFileSync(manifestpath, 'utf8');
			const manifest = json5.parse(manifestfile);

			scannedMods.set(manifest.UniqueID, {
				name: manifest.Name,
				version: manifest.Version,
				description: manifest.Description,
				disabled: modfolder.startsWith('.') ? true : false,
				path: match[1],
				folderName: modfolder
			});
			modlist.add(`${scannedMods.get(manifest.UniqueID).disabled ? '[-] ' : ''}${manifest.Name}`);
		}
		screen.render();
	});
}
