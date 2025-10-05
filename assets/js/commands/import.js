export default function importConfig(args, { displayOutput, userConfig, defaultConfig, applyTheme, updatePrompt }) {
    
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return displayOutput("No file selected", "error", "1");
        }

        try {
            const fileContent = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = (e) => reject(new Error("File reading failed"));
                reader.readAsText(file);
            });

            const importedConfig = JSON.parse(fileContent);
            
            if (!importedConfig || typeof importedConfig !== 'object') {
                throw new Error("Invalid config file");
            }

            const mergedConfig = {
                ...defaultConfig,
                ...importedConfig,
                openCommands: {
                    ...defaultConfig.OpenCommands,
                    ...importedConfig.openCommands
                }
            };

            userConfig = mergedConfig;
            localStorage.setItem('userConfig', JSON.stringify(userConfig));

            document.body.style.fontSize = `${userConfig.fontSize}px`;
            if (userConfig.theme) {
                applyTheme(userConfig.theme);
            }

            displayOutput(`
                ✅ Config imported successfully!
                Loaded ${Object.keys(userConfig.openCommands).length} commands
                Theme: ${userConfig.theme}
                Font size: ${userConfig.fontSize}px
            `, "info", "1");

        } catch (error) {
            console.error("Import error:", error);
            displayOutput(`
                ❌ Failed to import config:
                ${error.message || 'Invalid file format'}
            `, "error", "1");
        }
    };

    fileInput.click();
    
    return displayOutput(`Please select a config file to import\n\This will merge with existing settings`, "info", "1");

}
  