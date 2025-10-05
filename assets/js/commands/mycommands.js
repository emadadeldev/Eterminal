function mycommands(args, { displayOutput, userConfig}) {

    const list = Object.entries(userConfig.OpenCommands)
    .map(([key, value]) => `${key} → ${value}`)
    .join("\n");

    return displayOutput(list || "No custom commands found.", "info", "1");
}

export default mycommands;