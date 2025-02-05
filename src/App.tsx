import React from "react";
import VoiceCommand from "./components/VoiceCommand/VoiceCommand";
import { handleVoiceCommand } from "./utils/commandHandler";

const App: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold">
                🚀 VoiceFlow: AI-Powered Hands-Free Web Navigation
            </h1>
            <VoiceCommand onCommand={handleVoiceCommand} />
        </div>
    );
};

export default App;
