// <!-- <#
// .NOTES
//     Developer      : Emad Adel
//     GitHub         : https://github.com/emadadel4
//     © 2025 Emad Adel. All rights reserved.
// #> -->

import { commands } from './getcmd.js';


let isEditingConfig = false;
const inputField = document.getElementById('input');
const outputDiv = document.getElementById('output');
let commandHistory = JSON.parse(localStorage.getItem('commandHistory')) || [];
let commandHistoryIndex = -1; // To track the current position in the command history

// Load command history on initialization
commandHistory = JSON.parse(localStorage.getItem('commandHistory')) || [];
commandHistoryIndex = commandHistory.length; 


const Welcome = [
`
     _____  __    _____ _____ ____  __  __ ___ _   _    _    _     
    | ____| \\ \\  |_   _| ____|  _ \\|  \\/  |_ _| \\ | |  / \\  | |    
    |  _|    \\ \\   | | |  _| | |_) | |\\/| || ||  \\| | / _ \\ | |    
    | |___   / /   | | | |___|  _ <| |  | || || |\\  |/ ___ \\| |___ 
    |_____| /_/    |_| |_____|_| \\_\\_|  |_|___|_| \\_/_/   \\_\\_____|

    Type 'setconfig or sc' to customize Eterminal\n
`
];

// Load default config
const defaultConfig = {
    fontSize: 15,
    theme: "auto",
    background: "none",
    prompt: "yourname@eterminal:~$",
    promptcolor: "red",
    tips: "true",
    margin: "50",
    searchEngine: "duckduckgo",
    OpenCommands: {
      "yt": "https://www.youtube.com",
      "github": "https://github.com/emadadel4",
      "blog": "https://emadadel.gitlab.io"
    }
  }

// Load user config from localStorage or use default
let userConfig = JSON.parse(localStorage.getItem('userConfig')) || {...defaultConfig};
if (!userConfig.aliases) userConfig.aliases = {};

// Apply config on page load
window.addEventListener('DOMContentLoaded', () => {

    if (userConfig.background === "picsum") {

        if (document.querySelector('.bg-wrapper')) return;
    
        const highRes = `https://picsum.photos/1920/1080`;
    
        const img = new Image();
        img.src = highRes;
        img.decoding = "async";
        img.loading = "eager";
        img.className = 'bg-img';
    
        img.onload = () => {
            const bgWrapper = document.createElement('div');
            bgWrapper.className = 'bg-wrapper';
            bgWrapper.appendChild(img);
            document.body.appendChild(bgWrapper);
            img.classList.add('loaded');
        };
    
        let overlay = document.getElementById('background-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'background-overlay';
            overlay.className = 'bg-overlay';
            document.body.appendChild(overlay);
        }
    }

    if(userConfig.fontSize){document.documentElement.style.setProperty('--font-size', `${userConfig.fontSize}px`);}

    if(userConfig.prompt){updatePrompt(userConfig.prompt);}

    if(userConfig.promptcolor != "none"){document.documentElement.style.setProperty('--prompt', `${userConfig.promptcolor}`);}

    if(userConfig.tips == "true"){displayOutput(Welcome[0], "info", "1");}
    
    if(userConfig.margin){document.documentElement.style.setProperty('--margin', `${userConfig.margin}px`);}

});

// Apply theme
function applyTheme(themeName) {
    let themeLink = document.getElementById('theme-style');
    
    if (themeName === "auto") {
        if (themeLink) {
            themeLink.href = '';
        }
        return;
    }

    if (!themeLink) {
        themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.id = 'theme-style';
        document.head.appendChild(themeLink);
    }

    themeLink.href = `assets/css/themes/${themeName}.css`;
}

// Update prompt
function updatePrompt(newPrompt) {
    const promptElement = document.querySelector('.prompt');

    if (promptElement) {
        promptElement.textContent = newPrompt;
    }

}

// Focus input field on click
document.addEventListener("click", (event) => {
    const ignoredTags = ["INPUT", "TEXTAREA", "BUTTON", "A"];
    if (!ignoredTags.includes(event.target.tagName)) {
        inputField.focus();
    }
});

// Input Handling
inputField.addEventListener('keydown', function(event) {
    if (isEditingConfig) return;

    if (event.key === 'Enter') {
        const userInput = inputField.value.trim();
        
        if (userInput) {
            const args = userInput.split(/\s+/).filter(arg => arg.length > 0);
            const commandKey = Object.keys(commands).find(
                key => key.toLowerCase() === args[0].toLowerCase()
            );
        
            processCommand(userInput);
        
            if (commandKey) {
                if (commandHistory[commandHistory.length - 1] !== userInput) {
                    commandHistory.push(userInput);
                    commandHistoryIndex = commandHistory.length;
                    localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
                }
            }
        }

        inputField.value = '';
    } else if (event.key === 'ArrowUp') {
        if (commandHistoryIndex > 0) {
            commandHistoryIndex--;
            inputField.value = commandHistory[commandHistoryIndex];
            inputField.setSelectionRange(inputField.value.length, inputField.value.length);
        }

        event.preventDefault();

    } else if (event.key === 'ArrowDown') {
        if (commandHistoryIndex < commandHistory.length - 1) {
            commandHistoryIndex++;
            inputField.value = commandHistory[commandHistoryIndex];
            inputField.setSelectionRange(inputField.value.length, inputField.value.length);
        }
        event.preventDefault();
    } else if (event.key === 'Tab') {
        event.preventDefault();
        const currentInput = inputField.value.trim();
        if (currentInput) {
            const lowerInput = currentInput.toLowerCase();
            const matchingCommands = Object.keys(commands).filter(cmd => 
                cmd.toLowerCase().startsWith(lowerInput)
            );
            
            if (matchingCommands.length === 1) {
                inputField.value = matchingCommands[0] + ' ';
                inputField.setSelectionRange(inputField.value.length, inputField.value.length);
            } else if (matchingCommands.length > 1) {
                displayOutput(`Possible commands: ${matchingCommands.join(', ')}`);
            }
        }
    }
});

// Process command
function processCommand(input) {

    const args = input.trim().split(/\s+/).filter(arg => arg.length > 0);

    if (args.length === 0) return;

    let commandName = args[0];

    if (userConfig.aliases && userConfig.aliases[commandName]) {
        const aliasedCommand = userConfig.aliases[commandName];
        const aliasedArgs = aliasedCommand.split(/\s+/);
        args.splice(0, 1, ...aliasedArgs);
        commandName = args[0];
    }

    const commandKey = Object.keys(commands).find(
        key => key.toLowerCase() === commandName.toLowerCase()
    );

    if (commandKey) {
        const result = commands[commandKey](args.slice(1), {
            displayOutput,
            userConfig,
            commands,
            defaultConfig,
            applyTheme,
            updatePrompt,
            outputDiv
        });

        if (result instanceof Promise) {
            result.catch(error => {
                displayOutput(`Error: ${error.message}`, "error");
            });
        } else if (result !== undefined) {
            displayOutput(result, "info");
        }
    } else {
        displayOutput(`'${commandName}' is not a valid command. Type 'help' for available commands.`, "info");
    }
}

// Display Output
function displayOutput(output, level = "info") {
    
    const outputLine = document.createElement('div');
    outputLine.className = level;
    
    if (typeof output === 'string' || output instanceof String) {

        const urlRegex = /(https?:\/\/[^\s]+)/g;
        outputLine.innerHTML = output.replace(urlRegex, url => 
            `<a href="${url}" target="_blank">${url}</a>`
        );
    } else if (output instanceof HTMLElement) {
        outputLine.appendChild(output);
    } else {
        outputLine.textContent = String(output);
    }
    
    outputDiv.appendChild(outputLine);
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Get matching commands
function getMatchingCommands(input) {
    return Object.keys(commands).filter(cmd => cmd.startsWith(input));
}

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    inputField.focus();
});