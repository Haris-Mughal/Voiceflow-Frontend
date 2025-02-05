export const handleVoiceCommand = (command: string): void => {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes("open google")) {
        window.open("https://www.google.com", "_blank");
    } else if (lowerCommand.includes("scroll down")) {
        window.scrollBy(0, 300);
    } else if (lowerCommand.includes("scroll up")) {
        window.scrollBy(0, -300);
    } else if (lowerCommand.includes("reload page")) {
        window.location.reload();
    } else {
        console.log("Command not recognized:", command);
    }
};
