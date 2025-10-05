function setconfig(args, { displayOutput, userConfig, isEditingConfig ,applyTheme, updatePrompt}) {

    isEditingConfig = true;
    
    const inputField = document.getElementById('input');
    
    const container = document.createElement('div');
    container.className = 'settings-container';
    
    const textarea = document.createElement('textarea');
    textarea.className = 'config-textarea';
    textarea.autocomplete = 'off';
    textarea.value = JSON.stringify(userConfig, null, 2);
    textarea.style.height = "400px";
    const btnGroup = document.createElement('div');
    btnGroup.className = 'button-group';
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-save';
    saveBtn.textContent = 'Save';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-cancel';
    cancelBtn.textContent = 'Cancel';

    container.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const saveSettings = () => {

        try {

            const newConfig = JSON.parse(textarea.value);
            
            if (!newConfig || typeof newConfig !== 'object') {
                throw new Error("Invalid configuration format");
            }
            
            const configUpdates = {
                theme: () => applyTheme(newConfig.theme),
                fontSize: () => {
                    document.body.style.fontSize = `${newConfig.fontSize}px`;
                },
                background: () => {
                    if (newConfig.background === "none") {
                        document.documentElement.style.removeProperty('--background');
                    } else {
                        document.documentElement.style.setProperty('--background', newConfig.background);
                    }
                },
                prompt: () => updatePrompt(newConfig.prompt),
                promptcolor: () => {
                    document.documentElement.style.setProperty('--prompt', newConfig.promptcolor);
                },
                tips: () => {
                    userConfig.tips = newConfig.tips;
                },
                margin: () => {
                    document.documentElement.style.setProperty('--margin', `${newConfig.margin}px`);
                },
                searchEngine: () => {
                    userConfig.searchEngine = newConfig.searchEngine;
                }
            };
            
            Object.keys(newConfig).forEach(key => {
                if (key in userConfig) {
                    userConfig[key] = newConfig[key];
                    if (configUpdates[key]) configUpdates[key]();
                }
            });
            
            localStorage.setItem('userConfig', JSON.stringify(userConfig));
            isEditingConfig = false;
            container.remove();

            displayOutput("Settings saved successfully", "info", "1");

            setTimeout(() => inputField.focus(), 50);

        } catch (err) {
            displayOutput(`Error: ${err.message}`, "error");
            console.error("Config save error:", err);
        }
    };

    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            saveSettings();
        }
    });

    textarea.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'q' && e.ctrlKey) {
            e.preventDefault();
            e.stopPropagation();
            saveSettings();
            textarea.focus();
        }
    });

    container.append(textarea, btnGroup);
    displayOutput("PRESS CTRL + Q TO SAVE", "info", "1");
    displayOutput(container, "info");
    
    setTimeout(() => {
        textarea.focus();
        
        document.addEventListener('click', function clickOutside() {
            if (!container.contains(document.activeElement)) {
                inputField.focus();
                document.removeEventListener('click', clickOutside);
            }
        }, { once: true });
    }, 100);
}

export default setconfig;