import React, { useState, useEffect } from "react";

interface VoiceCommandProps {
    onCommand: (command: string) => void;
}

const VoiceCommand: React.FC<VoiceCommandProps> = ({ onCommand }) => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>("");

    type SpeechRecognitionEvent = Event & {
        results: SpeechRecognitionResultList;
    };

    useEffect(() => {
        const SpeechRecognition =
            (
                window as unknown as {
                    SpeechRecognition: typeof window.SpeechRecognition;
                }
            ).SpeechRecognition ||
            (
                window as unknown as {
                    webkitSpeechRecognition: typeof window.SpeechRecognition;
                }
            ).webkitSpeechRecognition;


        if (!SpeechRecognition) {
            console.error(
                "Speech Recognition API not supported in this browser."
            );
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
            setTranscript(lastTranscript);
            onCommand(lastTranscript);
        };

        if (isListening) recognition.start();
        else recognition.stop();

        return () => recognition.abort();
    }, [isListening, onCommand]);

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
