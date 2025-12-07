import { useState, useRef, useEffect } from "react";

interface StoryPage {
    text: string;
    imageUrl?: string;
    audioUrl?: string;
}

interface StoryPlayerProps {
    story: StoryPage[];
    onExit: () => void;
}

export default function StoryPlayer({ story, onExit }: StoryPlayerProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener("timeupdate", () => {
                if (audioRef.current) {
                    const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
                    setProgress(percent || 0);
                }
            });

            audioRef.current.addEventListener("ended", () => {
                setIsPlaying(false);
                if (isAutoPlay && currentPage < story.length - 1) {
                    setTimeout(() => nextPage(), 1000);
                }
            });
        }
    }, [currentPage, isAutoPlay, story.length]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const nextPage = () => {
        if (currentPage < story.length - 1) {
            setCurrentPage(currentPage + 1);
            setIsPlaying(false);
            setProgress(0);
        }
    };

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            setIsPlaying(false);
            setProgress(0);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="stars"></div>
                <div className="stars2"></div>
                <div className="stars3"></div>
            </div>

            {/* Glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="relative z-10 min-h-screen flex flex-col px-4 py-8">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={onExit}
                        className="group flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-purple-500/30 hover:border-purple-500/50 rounded-full backdrop-blur-xl transition-all duration-300"
                    >
                        <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-purple-200 font-medium">Exit Story</span>
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsAutoPlay(!isAutoPlay)}
                            className={`px-4 py-2 rounded-full backdrop-blur-xl border transition-all ${
                                isAutoPlay
                                    ? "bg-purple-600/30 border-purple-500/50 text-purple-200"
                                    : "bg-white/10 border-purple-500/30 text-purple-300"
                            }`}
                        >
                            {isAutoPlay ? "🔄 Auto" : "▶️ Manual"}
                        </button>
                    </div>
                </div>

                {/* Main story container */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="max-w-6xl w-full">
                        {/* Book-like container */}
                        <div className="relative">
                            {/* Book shadow */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-2xl"></div>

                            {/* Book pages */}
                            <div className="relative bg-gradient-to-br from-slate-900/90 to-purple-900/90 backdrop-blur-2xl rounded-3xl border border-purple-500/30 overflow-hidden shadow-2xl">
                                {/* Page indicator */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

                                <div className="grid md:grid-cols-2 gap-0 min-h-[600px]">
                                    {/* Left page - Illustration */}
                                    <div className="relative p-8 md:p-12 flex items-center justify-center border-r border-purple-500/20">
                                        <div className="relative w-full h-full max-h-[500px] rounded-2xl overflow-hidden group">
                                            {story[currentPage]?.imageUrl ? (
                                                <img
                                                    src={story[currentPage].imageUrl}
                                                    alt="Story illustration"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 flex flex-col items-center justify-center backdrop-blur-xl border border-purple-500/30 rounded-2xl">
                                                    <div className="text-7xl mb-4 animate-float">🎨</div>
                                                    <div className="text-purple-300 text-lg font-medium">Illustration</div>
                                                    <div className="text-purple-400/60 text-sm mt-2">Page {currentPage + 1}</div>
                                                </div>
                                            )}
                                            {/* Image frame effect */}
                                            <div className="absolute inset-0 border-2 border-purple-500/20 rounded-2xl pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Right page - Text */}
                                    <div className="relative p-8 md:p-12 flex flex-col justify-between">
                                        {/* Text content */}
                                        <div className="flex-1 flex items-center">
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
                                                    <span className="text-purple-400 font-medium">Chapter {currentPage + 1}</span>
                                                </div>
                                                <p className="text-purple-100 text-xl md:text-2xl leading-relaxed font-serif">
                                                    {story[currentPage]?.text}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Page number */}
                                        <div className="text-center mt-8">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full backdrop-blur-xl">
                                                <span className="text-purple-300 text-sm font-medium">
                                                    Page {currentPage + 1} of {story.length}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom edge effect */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                            </div>
                        </div>

                        {/* Audio player */}
                        {story[currentPage]?.audioUrl && (
                            <div className="mt-8 backdrop-blur-xl bg-white/5 border border-purple-500/30 rounded-2xl p-6">
                                <audio ref={audioRef} src={story[currentPage].audioUrl} />
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={togglePlay}
                                        className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                    >
                                        {isPlaying ? (
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        )}
                                    </button>
                                    <div className="flex-1">
                                        <div className="h-2 bg-purple-900/50 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="text-purple-300 text-sm font-medium">
                                        {isPlaying ? "Playing..." : "Paused"}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation buttons */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <button
                                onClick={previousPage}
                                disabled={currentPage === 0}
                                className="group px-8 py-4 bg-white/10 hover:bg-white/20 disabled:bg-white/5 border border-purple-500/30 hover:border-purple-500/50 disabled:border-purple-500/10 rounded-full backdrop-blur-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="text-purple-200 font-medium">Previous</span>
                                </div>
                            </button>

                            <button
                                onClick={nextPage}
                                disabled={currentPage === story.length - 1}
                                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-purple-900/30 disabled:to-pink-900/30 rounded-full backdrop-blur-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-purple-500/50"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-white font-medium">Next</span>
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
