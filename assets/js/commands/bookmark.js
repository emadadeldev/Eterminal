function bookmark(args, { displayOutput, userConfig }) {
    
    if (!chrome?.bookmarks) {
        return displayOutput(
            "Bookmarks feature only works in browser extensions",
            "error",
            "1"
        );
    }

    if (args[0] === "-s" && args.length > 1) {
        const searchQuery = args.slice(1).join(" ").toLowerCase();
        chrome.bookmarks.search(searchQuery, (results) => {
            const filtered = results.filter(b => b.url);
            const output = filtered.map(b => `🔍 ${b.title} ${b.url}`).join("\n");
            
            displayOutput(
                `Search Results for "${searchQuery}":\n${output || "No matches found"}`,
                "info",
                "1"
            );
        });
    }

    chrome.bookmarks.getTree((bookmarkTree) => {
        const formatBookmarks = (nodes) => {
            let output = "";
            nodes.forEach(node => {
                if (node.url) output += `📚 ${node.title} ${node.url}\n`;
                if (node.children) output += formatBookmarks(node.children);
            });
            return output;
        };

        const result = formatBookmarks(bookmarkTree[0].children);
        displayOutput(
            result,
            "info",
            "1"
        );
    });
}

export default bookmark;
