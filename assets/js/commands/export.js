function exportConfig(args, { displayOutput, userConfig }) {
    try {

        const { meta, ...config } = userConfig;

        const blob = new Blob([JSON.stringify(config, null, 2)], {
            type: "application/json"
        });

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `eterminal-backup-${Date.now()}.json`;
        document.body.append(a);
        a.click();
        setTimeout(() => a.remove(), 100);

    } catch (error) {
        console.error("Export failed:", error);
        return displayOutput(
            `Export failed: ${error.message}`,
            "error",
            "1"
        );
    }
}

export default exportConfig;