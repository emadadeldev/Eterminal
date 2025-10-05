function help(args, { displayOutput }) {
    
    return displayOutput(
        "Usage: [command] [options]\n\n" +
        "The following commands are available:\n" +
        "help         Display this help message.\n" +
        "clear        Clear the terminal.\n" +
        "print        Display custom text. Usage: print [text]\n" +
        "open         Open a stored URL. Usage: open [keyword]\n" +
        "newurl       Add a custom URL. Usage: newurl [keyword] [url]\n" +
        "mycommands   Show all stored URL commands.\n" +
        "alias        Add a custom alias. Usage: alias [keyword] [command]\n" +
        "rm           Remove a stored URL command. Usage: rm [keyword]\n" +
        "bookmarks    Show all bookmarks. Use -s to search.\n" +
        "setconfig    Set config file.\n" +
        "export       Export config file.\n" +
        "import       Import config file.\n" +
        "search       Search with engines. Usage: search [-g | -d | -s] [query]\n",
        "info",
        "1"
    );
}

export default help;