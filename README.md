# Ceta
> 🐋 Command line Stardew Valley mod manager.

Ceta is a convenient and lightweight terminal manager for (SMAPI) Stardew Valley mods.
It helps you easily enable and disable mods instead of manually doing it by
renaming files or rotating mod folders.

Features (Future and Now):
- Check and update mods before running SMAPI
- Disable mods automatically* if 2 enabled mods are incompatible
- Download the latest version of SMAPI
- Launch with different sets of mods

# Screenshots
<img src='https://modeus.is-inside.me/idJTvaeX.png' width='512'>
<img src='https://modeus.is-inside.me/W2elqPbm.png' width='512'>

# Getting Started
> ⚠ Ceta is currently in an alpha state. I take no responsiblity if anything happens to your mods.

Here are instructions to get Ceta running on your computer. You are expected to know how to use
a terminal. Note that **Ceta is not tested on MacOS.**

## Prerequisites
- Install Node.js from [here](https://nodejs.dev)
  - Latest version is recommended.
- Install Git however appropriate to your OS (this is optional as Ceta can be
  downloaded as a zip [here](https://github.com/TorchedSammy/Ceta/archive/master.zip))

## Steps
1. Open a terminal and run `git clone https://github.com/TorchedSammy/Ceta` then
`cd Ceta`. 
If you downloaded Ceta as zip you don't have to `git clone`, just extract
and navigate to the extracted folder.
2. `npm install`
3. `node .` to run.

If you run `npm link` (may need sudo on Unix) you can also open Ceta with a
single `ceta` command anywhere.

# Config
Ceta has some configurable options that you may want to change.
It's located in `%APPDATA%\Ceta` on Windows, and `~/.config/Ceta` on Linux.

# License
Ceta is licensed under the MIT license. See the [LICENSE file](LICENSE) for
details.

