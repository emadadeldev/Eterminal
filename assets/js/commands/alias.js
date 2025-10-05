function alias(args, { userConfig }) {

    if (!userConfig.aliases) userConfig.aliases = {};

    if (args.length === 0) {
        const list = Object.entries(userConfig.aliases)
            .map(([key, val]) => `${key}="${val}"`)
            .join('\n');
        return list || "No aliases set.";
    }

    const [name, ...valueParts] = args.join(' ').split('=');
    const value = valueParts.join('=').replace(/^"|"$/g, '');

    if (!name || !value) {
        return `Usage: alias name="command"`;
    }

    userConfig.aliases[name.trim()] = value.trim();
    localStorage.setItem('userConfig', JSON.stringify(userConfig));
    return `Alias set: ${name.trim()} = "${value.trim()}"`;
}

export default alias;