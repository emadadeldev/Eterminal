export default function open(args, context) {
    
    const { userConfig } = context;

    if (args.length === 0) {
        return `Usage: open <name | url>`;
    }

    const input = args[0];

    if (/^https?:\/\//.test(input)) {
        window.open(input, '_blank');
        return `Opening ${input}`;
    }

    const url = userConfig.OpenCommands[input];

    if (url) {
        window.open(url, '_blank');
        return `Opening ${input} → ${url}`;
    } else {
        return `No URL found for '${input}'. Type "mycommands" to see the list.`;
    }
}