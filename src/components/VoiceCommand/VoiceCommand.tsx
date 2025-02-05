import React, { useState, useEffect, useCallback } from "react";

interface VoiceCommandProps {
    onCommand: (command: string) => void;
}

declare global {
    type SpeechRecognitionEvent = Event & {
        results: SpeechRecognitionResultList;
    };

    interface ISpeechRecognition {
        continuous: boolean;
        lang: string;
        onstart: (() => void) | null;
        onend: (() => void) | null;
        onresult: ((event: SpeechRecognitionEvent) => void) | null;
        start(): void;
        stop(): void;
        abort(): void;
    }

    interface Window {
        SpeechRecognition: new () => ISpeechRecognition;
        webkitSpeechRecognition: new () => ISpeechRecognition;
    }
}

const VoiceCommand: React.FC<VoiceCommandProps> = ({ onCommand }) => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>("");

    const handleCommand = useCallback(
        (command: string) => {
            setTranscript(command);
            onCommand(command);
        },
        [onCommand]
    );

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error("Speech Recognition API is not supported.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-US";

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const lastTranscript =
                event.results[event.results.length - 1][0].transcript;
            handleCommand(lastTranscript);
        };

        if (isListening) recognition.start();
        else recognition.stop();

        return () => recognition.abort();
    }, [isListening, handleCommand]);

    return (
        <div className="text-center">
            <button
                className="bg-blue-500 px-4 py-2 rounded text-white mt-4"
                onClick={() => setIsListening(!isListening)}
            >
                {isListening ? "🎤 Listening..." : "🎙️ Start Voice Control"}
            </button>
            <p className="mt-2 text-gray-300">{transcript}</p>
        </div>
    );
};

export default VoiceCommand;

