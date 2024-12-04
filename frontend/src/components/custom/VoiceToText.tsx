import { Button } from "../ui/button";
import { Info, Mic, MicOff } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";

const VoiceToText: React.FC = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [enableEditing, setEnableEditing] = useState<boolean>(true);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support the Web Speech API.");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }
      setTranscript(finalTranscript + " " + interimTranscript);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    setRecognition(recognitionInstance);
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="mt-6 border-t-2 border-dashed p-4 bg-gradient-to-r from-primary/50 to-secondary">
      <div className="mb-4">
        <h2 className="font-semibold mb-2 underline">Voice to Text</h2>
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <Info className="w-4" />
          With Voice to Text, you can easily create text just by speaking.
          Afterward, you can enable text editing to make any changes you need.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Button onClick={isListening ? stopListening : startListening}>
          {isListening ? (
            <>
              Stop Speaking <MicOff className="w-4 ml-2" />
            </>
          ) : (
            <>
              Start Speaking <Mic className="w-4 ml-2" />
            </>
          )}
        </Button>
        <div className="flex items-center space-x-2">
          <Switch
            id="enable-editing"
            onCheckedChange={() => {
              setEnableEditing(!enableEditing);
            }}
          />
          <Label htmlFor="enable-editing">Enable Editing</Label>
        </div>
      </div>

      {
        <Textarea
          placeholder="Voice to text here..."
          value={transcript}
          className="mt-4"
          onChange={(e) => setTranscript(e.target.value)}
          readOnly={enableEditing}
        />
      }
    </div>
  );
};

export default VoiceToText;
