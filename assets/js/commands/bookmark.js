function bookmark(args, { displayOutput }) {

    if (!chrome?.bookmarks) {
        return displayOutput(
            "Bookmarks feature only works in browser extensions",
            "error",
            "1"
        );
    }

    // =========================
    // SEARCH MODE
    // =========================
    if (args[0] === "-s" && args.length > 1) {
        const searchQuery = args.slice(1).join(" ").toLowerCase();

        chrome.bookmarks.search(searchQuery, (results) => {
            const filtered = results.filter(b => b.url);

            const output = filtered
                .map(b => `${b.title} ${b.url}\n`)
                .join("");

            displayOutput(output || "No results found", "info", "1");
        });

        return;
}

    // =========================
    // TREE MODE
    // =========================
    chrome.bookmarks.getTree((bookmarkTree) => {

    const formatBookmarks = (nodes) => {
        let output = "";

        nodes.forEach(node => {

            if (node.url) {
                output += `${node.title} ${node.url}\n`;
            }

            if (node.children) {
                output += formatBookmarks(node.children);
            }
        });

        return output;
    };

    const result = formatBookmarks(bookmarkTree[0].children || []);

    displayOutput(result || "No bookmarks found", "info");
});
}

export default bookmark;