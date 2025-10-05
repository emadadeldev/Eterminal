
function search(args, { displayOutput, userConfig }) {

    if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
        return displayOutput("Usage: Search [-g|-d|-y] <query>", "info", "1");
    }

    const option = args[0].toLowerCase();
    let query = "";

    switch (option) {
        case "-g":
            query = args.slice(1).join(" ").trim();
            if (!query) {
                return displayOutput("Usage: Search -g <query>", "info", "1");
            }
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            return displayOutput(`🔍 Searching Google for "${query}"`, "info", "1");

        case "-d":
            query = args.slice(1).join(" ").trim();
            if (!query) {
                return displayOutput("Usage: Search -d <query>", "info", "1");
            }
            window.open(`https://duckduckgo.com/?t=ffab&q=${encodeURIComponent(query)}`, '_blank');
            return displayOutput(`🔍 Searching DuckDuckGo for "${query}"`, "info", "1");

        case "-y":
            query = args.slice(1).join(" ").trim();
            if (!query) {
                return displayOutput("Usage: Search -y <query>", "info", "1");
            }
            window.open(`https://youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
            return displayOutput(`🔍 Searching YouTube for "${query}"`, "info", "1");

        default:

            if (option.startsWith("-")) {
                return displayOutput("Unknown option. Usage: Search [-g|-d|-y] <query>", "error", "1");
            }

            query = args.join(" ").trim();
            if (!query) {
                return displayOutput("Usage: Search [-g|-d|-y] <query>", "info", "1");
            }

            if (userConfig.searchEngine === "startpage") {
                window.open(`https://www.startpage.com/sp/search?query=${query}`, '_blank');
            } else if (userConfig.searchEngine === "google") {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            } else {
                window.open(`https://duckduckgo.com/?t=ffab&q=${encodeURIComponent(query)}`, '_blank');
            }

        return displayOutput(`🔍 Searching ${userConfig.searchEngine} for "${query}"`, "info", "1");
    }
}

export default search;