import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [currentSound, setCurrentSound] = useState<'calm' | 'rain' | 'ocean' | 'birds'>('calm');
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const oscillatorsRef = useRef<(OscillatorNode | AudioBufferSourceNode)[]>([]);

    const soundDescriptions = {
        calm: { name: "Calm", emoji: "🌙", description: "Peaceful ambient tones" },
        rain: { name: "Rain", emoji: "🌧️", description: "Gentle rainfall" },
        ocean: { name: "Ocean", emoji: "🌊", description: "Calming ocean waves" },
        birds: { name: "Birds", emoji: "🐦", description: "Soft chirping" },
    };

    useEffect(() => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.value = volume;

        return () => {
            stopSound();
            audioContextRef.current?.close();
        };
    }, []);

    useEffect(() => {
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current?.currentTime || 0);
        }
    }, [volume]);

    const createCalmSound = () => {
        if (!audioContextRef.current || !gainNodeRef.current) return;

        // Peaceful harmonic drone with multiple layers
        const frequencies = [
            { freq: 130.81, detune: 0 },    // C3
            { freq: 196.00, detune: 2 },    // G3 (perfect fifth)
            { freq: 261.63, detune: -1 },   // C4 (octave)
            { freq: 329.63, detune: 1.5 },  // E4 (major third)
        ];

        frequencies.forEach(({ freq, detune }, index) => {
            const osc = audioContextRef.current!.createOscillator();
            const oscGain = audioContextRef.current!.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;
            osc.detune.value = detune;
            oscGain.gain.value = 0.08 / (index + 1); // Decreasing volume for higher harmonics

            osc.connect(oscGain);
            oscGain.connect(gainNodeRef.current!);
            osc.start();

            oscillatorsRef.current.push(osc);
        });
    };

    const createRainSound = () => {
        if (!audioContextRef.current || !gainNodeRef.current) return;

        // White noise filtered to sound like rain
        const bufferSize = audioContextRef.current.sampleRate * 2;
        const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = audioContextRef.current.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = audioContextRef.current.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        filter.Q.value = 0.5;

        const noiseGain = audioContextRef.current.createGain();
        noiseGain.gain.value = 0.15;

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(gainNodeRef.current);
        noise.start();

        oscillatorsRef.current.push(noise);
    };

    const createOceanSound = () => {
        if (!audioContextRef.current || !gainNodeRef.current) return;

        // Low frequency oscillation for waves
        const wave1 = audioContextRef.current.createOscillator();
        const wave2 = audioContextRef.current.createOscillator();
        const lfo = audioContextRef.current.createOscillator();
        const lfoGain = audioContextRef.current.createGain();
        const waveGain = audioContextRef.current.createGain();

        wave1.type = 'sine';
        wave1.frequency.value = 80;
        wave2.type = 'sine';
        wave2.frequency.value = 82;

        lfo.type = 'sine';
        lfo.frequency.value = 0.15; // Slow wave motion
        lfoGain.gain.value = 10;

        waveGain.gain.value = 0.12;

        lfo.connect(lfoGain);
        lfoGain.connect(wave1.frequency);
        lfoGain.connect(wave2.frequency);

        wave1.connect(waveGain);
        wave2.connect(waveGain);
        waveGain.connect(gainNodeRef.current);

        wave1.start();
        wave2.start();
        lfo.start();

        oscillatorsRef.current.push(wave1, wave2, lfo);

        // Add subtle white noise for foam
        const bufferSize = audioContextRef.current.sampleRate * 2;
        const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = audioContextRef.current.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = audioContextRef.current.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 2000;

        const noiseGain = audioContextRef.current.createGain();
        noiseGain.gain.value = 0.03;

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(gainNodeRef.current);
        noise.start();

        oscillatorsRef.current.push(noise);
    };

    const createBirdsSound = () => {
        if (!audioContextRef.current || !gainNodeRef.current) return;

        // Gentle background tone
        const ambient = audioContextRef.current.createOscillator();
        const ambientGain = audioContextRef.current.createGain();
        ambient.type = 'sine';
        ambient.frequency.value = 220;
        ambientGain.gain.value = 0.05;
        ambient.connect(ambientGain);
        ambientGain.connect(gainNodeRef.current);
        ambient.start();
        oscillatorsRef.current.push(ambient);

        // Occasional chirps
        const createChirp = () => {
            if (!audioContextRef.current || !gainNodeRef.current) return;

            const chirp = audioContextRef.current.createOscillator();
            const chirpGain = audioContextRef.current.createGain();

            chirp.type = 'sine';
            chirp.frequency.setValueAtTime(1200, audioContextRef.current.currentTime);
            chirp.frequency.exponentialRampToValueAtTime(800, audioContextRef.current.currentTime + 0.1);

            chirpGain.gain.setValueAtTime(0.08, audioContextRef.current.currentTime);
            chirpGain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.15);

            chirp.connect(chirpGain);
            chirpGain.connect(gainNodeRef.current);

            chirp.start(audioContextRef.current.currentTime);
            chirp.stop(audioContextRef.current.currentTime + 0.15);

            // Random next chirp
            setTimeout(createChirp, Math.random() * 3000 + 2000);
        };

        createChirp();
    };

    const playSound = () => {
        if (!audioContextRef.current || !gainNodeRef.current) return;

        switch (currentSound) {
            case 'calm':
                createCalmSound();
                break;
            case 'rain':
                createRainSound();
                break;
            case 'ocean':
                createOceanSound();
                break;
            case 'birds':
                createBirdsSound();
                break;
        }
    };

    const stopSound = () => {
        oscillatorsRef.current.forEach(node => {
            try {
                if ('stop' in node) {
                    node.stop();
                }
                node.disconnect();
            } catch (e) {
                // Already stopped
            }
        });
        oscillatorsRef.current = [];
    };

    const togglePlay = () => {
        if (isPlaying) {
            stopSound();
            setIsPlaying(false);
        } else {
            // Resume audio context if suspended (browser autoplay policy)
            audioContextRef.current?.resume().then(() => {
                playSound();
                setIsPlaying(true);
            });
        }
    };

    const changeSoundType = (type: 'calm' | 'rain' | 'ocean' | 'birds') => {
        setCurrentSound(type);
        if (isPlaying) {
            stopSound();
            setTimeout(() => {
                playSound();
            }, 100);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            stopSound();
            setTimeout(() => {
                playSound();
            }, 100);
        }
    }, [currentSound]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Sound selector */}
            {isPlaying && (
                <div className="backdrop-blur-xl bg-white/10 border border-purple-500/30 rounded-2xl p-4 shadow-2xl animate-scale-in">
                    <div className="text-purple-200 text-xs font-medium mb-3">Nature Sounds</div>
                    <div className="grid grid-cols-2 gap-2">
                        {(Object.keys(soundDescriptions) as Array<keyof typeof soundDescriptions>).map((key) => (
                            <button
                                key={key}
                                onClick={() => changeSoundType(key)}
                                className={`group/sound relative px-3 py-2 rounded-xl transition-all duration-300 ${
                                    currentSound === key
                                        ? 'bg-purple-500/40 border-2 border-purple-400/60 shadow-lg'
                                        : 'bg-white/10 border border-purple-500/20 hover:bg-white/20'
                                }`}
                            >
                                <div className="text-center">
                                    <div className="text-2xl mb-1">{soundDescriptions[key].emoji}</div>
                                    <div className={`text-xs ${
                                        currentSound === key ? 'text-purple-200 font-bold' : 'text-purple-300'
                                    }`}>
                                        {soundDescriptions[key].name}
                                    </div>
                                </div>
                                {currentSound === key && (
                                    <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-xl blur -z-10 animate-pulse"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Volume slider */}
            {isPlaying && (
                <div className="backdrop-blur-xl bg-white/10 border border-purple-500/30 rounded-2xl p-4 shadow-2xl animate-scale-in">
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                        </svg>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-28 h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer
                                [&::-webkit-slider-thumb]:appearance-none
                                [&::-webkit-slider-thumb]:w-4
                                [&::-webkit-slider-thumb]:h-4
                                [&::-webkit-slider-thumb]:rounded-full
                                [&::-webkit-slider-thumb]:bg-purple-500
                                [&::-webkit-slider-thumb]:cursor-pointer
                                [&::-webkit-slider-thumb]:shadow-lg
                                [&::-webkit-slider-thumb]:hover:bg-purple-400
                                [&::-webkit-slider-thumb]:transition-all
                                [&::-moz-range-thumb]:w-4
                                [&::-moz-range-thumb]:h-4
                                [&::-moz-range-thumb]:rounded-full
                                [&::-moz-range-thumb]:bg-purple-500
                                [&::-moz-range-thumb]:cursor-pointer
                                [&::-moz-range-thumb]:border-0
                                [&::-moz-range-thumb]:shadow-lg
                                [&::-moz-range-thumb]:hover:bg-purple-400"
                        />
                        <span className="text-purple-300 text-xs font-medium w-8">{Math.round(volume * 100)}%</span>
                    </div>
                </div>
            )}

            {/* Play/Pause button */}
            <button
                onClick={togglePlay}
                className="group relative w-16 h-16 rounded-full backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-purple-500/30 hover:border-purple-500/50 shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden"
                aria-label={isPlaying ? "Pause nature sounds" : "Play nature sounds"}
                title={isPlaying ? soundDescriptions[currentSound].description : "Play nature sounds"}
            >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-linear-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center w-full h-full">
                    {isPlaying ? (
                        <div className="flex gap-1 items-end">
                            <div className="w-1 bg-purple-400 rounded-full animate-music-bar-1" style={{ height: '16px' }}></div>
                            <div className="w-1 bg-pink-400 rounded-full animate-music-bar-2" style={{ height: '24px' }}></div>
                            <div className="w-1 bg-purple-400 rounded-full animate-music-bar-3" style={{ height: '20px' }}></div>
                            <div className="w-1 bg-pink-400 rounded-full animate-music-bar-4" style={{ height: '18px' }}></div>
                        </div>
                    ) : (
                        <div className="relative">
                            <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                            <div className="absolute -top-1 -right-1 text-lg">🌿</div>
                        </div>
                    )}
                </div>

                {/* Ripple effect on playing */}
                {isPlaying && (
                    <>
                        <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping"></div>
                        <div className="absolute inset-0 rounded-full bg-pink-500/20 animate-pulse"></div>
                    </>
                )}
            </button>
        </div>
    );
}
