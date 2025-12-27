
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Mic, MicOff, Volume2, VolumeX, X } from 'lucide-react';

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const SYSTEM_INSTRUCTION = `
You are the AI Concierge for Matt's Auto Rental. 
Your tone is helpful, professional, and friendly. 

IMPORTANT POLICIES:
- We DO NOT provide insurance. Customers MUST provide their own valid insurance policy.
- Minimum rental age is 21. A valid driver's license is required.
- RENTAL AGREEMENT: All customers must sign a Vehicle Rental Agreement BEFORE pickup.
- The agreement is handled electronically via DocuSign.
- PROCESS: Once a booking request is approved, the customer will receive an email from DocuSign to sign the agreement.
- NO rental will be released without a signed agreement on file.

Our Current Fleet:
1. 2013 Toyota Prius Five: A red hybrid wagon (Prius V). Great fuel economy (44 City / 40 Hwy). $45 per day.
2. 2014 Chrysler Town & Country: A silver 30th Anniversary Edition luxury minivan. Features Nappa leather and Stow 'n Go seating. $45 per day.

Do NOT mention Hondas, Teslas, or Fords.
Keep your answers concise and conversational.
`;

export const VoiceAssistant: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<string>('Ready to help');
  const [isMuted, setIsMuted] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close?.();
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    for (const source of sourcesRef.current) {
      try {
        source.stop();
      } catch (e) {
        // Silently handle if source already stopped
      }
    }
    sourcesRef.current.clear();
    setIsActive(false);
    setStatus('Ready to help');
  }, []);

  const startSession = async () => {
    try {
      setStatus('Connecting...');
      setIsActive(true);

      // Initialize AI instance right before usage as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onopen: () => {
            setStatus('I\'m listening...');
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              // CRITICAL: Rely solely on sessionPromise resolves to send input
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData) {
              const ctx = audioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              setStatus('Assistant speaking...');
            }

            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current) {
                try {
                  source.stop();
                } catch (e) {}
              }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            if (message.serverContent?.turnComplete) {
              setStatus('I\'m listening...');
            }
          },
          onerror: (e) => {
            console.error('Gemini error:', e);
            setStatus('Connection error');
            setIsActive(false);
          },
          onclose: () => {
            setIsActive(false);
            setStatus('Session ended');
          },
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start session:', err);
      setStatus('Microphone access denied');
      setIsActive(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-10 duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border border-indigo-100 w-80 overflow-hidden flex flex-col">
        <div className="bg-indigo-700 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-white/50'}`} />
            <span className="font-semibold text-sm">Matt's Concierge</span>
          </div>
          <button onClick={() => { stopSession(); onClose(); }} className="hover:bg-indigo-600 p-1 rounded transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 flex flex-col items-center gap-6">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-indigo-100 text-indigo-700 scale-110' : 'bg-slate-100 text-slate-400'}`}>
            {isActive ? <Volume2 size={40} className="animate-bounce" /> : <MicOff size={40} />}
          </div>
          
          <div className="text-center">
            <p className="text-slate-900 font-medium mb-1">{status}</p>
            <p className="text-slate-500 text-xs px-4 italic">Note: Signed agreement required via DocuSign.</p>
          </div>

          <div className="flex gap-4 items-center">
            {isActive ? (
              <>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <button 
                  onClick={stopSession}
                  className="px-6 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                >
                  End Chat
                </button>
              </>
            ) : (
              <button 
                onClick={startSession}
                className="px-8 py-3 bg-indigo-700 text-white rounded-full font-bold hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-200 flex items-center gap-2"
              >
                <Mic size={20} />
                Start Voice Chat
              </button>
            )}
          </div>
        </div>
        
        <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
           <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Powered by Gemini AI</span>
        </div>
      </div>
    </div>
  );
};
