function newurl(args, { displayOutput, userConfig, commands }) {
    if (args.length < 2 || args[0] === '-h' || args[0] === '--help') {
        return displayOutput("Usage: newurl [keyword] [url]", "info", "1");
    }
    const keyword = args[0].toLowerCase();
    const url = args.slice(1).join(" ").trim();

    if (commands.hasOwnProperty(keyword)) {
        return displayOutput("This keyword is reserved and cannot be used.", "error", "1");
    }

    if (!/^https?:\/\//i.test(url)) {
        return displayOutput("Invalid URL. It must start with http:// or https://", "error", "1");
    }

    userConfig.OpenCommands[keyword] = url;
    localStorage.setItem('userConfig', JSON.stringify(userConfig));

    return displayOutput(`✅ Added: ${keyword} → ${url}`, "info", "1");
}

export default newurl;
