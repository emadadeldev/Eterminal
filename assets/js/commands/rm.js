function rm(args, { displayOutput, userConfig }) {

    if (args.length < 1 || args[0] === '-h' || args[0] === '--help') {
        return displayOutput("Usage: rm [keyword]", "info", "1");
    }

    const keyword = args[0].toLowerCase();

    if (!userConfig.OpenCommands.hasOwnProperty(keyword)) {
        return displayOutput(`Keyword '${keyword}' not found.`, "error", "1");
    }

    delete userConfig.OpenCommands[keyword];
    localStorage.setItem('userConfig', JSON.stringify(userConfig));

    return displayOutput(`✅ Removed keyword '${keyword}' successfully.`, "info", "1");
}

export default rm;
