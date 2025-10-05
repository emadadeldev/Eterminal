# 🔧 ETerminal

![image](https://github.com/user-attachments/assets/efb41266-741b-497e-94cd-d6a0662acbe1)

A lightweight, make new tab like terminal and add your custom commands and more.

# Features

- Open stored URLs with keywords
- Add and remove custom URL shortcuts
- Search with DuckDuckGo (default), change to your favorite search engine
- Export and import your config
- Search in bookmarks
- add custom alias
- customize your eTerminal tab via config
- No data is stored; everything is client-side only  

<br>
<br>



# Commands

### 🆘 `help`
Displays the full list of available commands.

### 🧹 `clear`
Clears the terminal output.

### 🌐 `open [keyword]`
Opens a stored URL using the given keyword.  
Example:
```bash
open github
```

### ➕ `newurl [keyword] [url]`
Stores a custom URL that can be opened later with the specified keyword.  
Example:
```bash
newurl github https://github.com
```

### 📂 `mycommands`
Lists all saved URL commands.

### 🏷️ `alias [name]="command"`
Creates a shortcut for any command.  
Example:
```bash
alias yt="open https://www.youtube.com"
```

### ❌ `rm [keyword]`
Removes a saved command or URL keyword.

### 🔖 `bookmarks`
Displays all saved bookmarks.  
Use `-s` to search bookmarks.

### ⚙️ `setconfig`
Allows updating your configuration (e.g., background, theme).

### 📤 `export`
Exports the current configuration as JSON.

### 📥 `import`
Imports a previously exported configuration file.

### 🔎 `search [-g | -d | -s] [query]`
Performs a web search:  
- `-g` = Google  
- `-d` = DuckDuckGo  
- `-s` = Startpage  
Example:
```bash
search -g best js frameworks
```
