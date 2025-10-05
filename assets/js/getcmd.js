import about from './commands/about.js';
import help from './commands/help.js';
import open from './commands/open.js';
import newurl from './commands/newurl.js';
import rm from './commands/rm.js';
import mycommands from './commands/mycommands.js';
import search from './commands/search.js';
import exportConfig from './commands/export.js';
import importConfig from './commands/import.js';
import setconfig from './commands/setconfig.js';
import bookmark from './commands/bookmark.js';
import clear from './commands/clear.js';
import alias from './commands/alias.js';

export const commands = {
    about,
    help,
    open,
    newurl,
    rm,
    mycommands,
    search,
    exportConfig,
    importConfig,
    setconfig,
    bookmark,
    clear,
    alias
};

//Define aliases before the loop
const aliases = {
    dev: "about",
    h: "help",
    o: "open",
    s: "search",
    b: "bookmark",
    cls: "clear",
    mc: "mycommands",
    sc: "setconfig",
    ex: "exportConfig",
    im: "importConfig",
};

// Map aliases to real commands
for (const [alias, target] of Object.entries(aliases)) {
    commands[alias] = commands[target];
}