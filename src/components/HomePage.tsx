export default function HomePage({ onStart }: { onStart: () => void }) {
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            {/* Animated starfield background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
                <div className="stars"></div>
                <div className="stars2"></div>
                <div className="stars3"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400/40 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`,
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
                {/* Main content */}
                <div className="text-center space-y-8 max-w-4xl">
                    {/* Logo animation */}
                    <div className="relative inline-block">
                        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-50 animate-pulse"></div>
                        <div className="relative">
                            <div className="text-8xl md:text-9xl mb-4 animate-float">✨</div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x leading-tight">
                            StoryForge AI
                        </h1>
                        <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
                    </div>

                    {/* Subtitle */}
                    <p className="text-2xl md:text-3xl text-purple-200 font-light tracking-wide">
                        Where Imagination Meets Technology
                    </p>

                    {/* Feature highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
                        {[
                            { icon: "📚", text: "AI-Powered Stories" },
                            { icon: "🎨", text: "Beautiful Illustrations" },
                            { icon: "🎵", text: "Audio Narration" },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="group backdrop-blur-xl bg-white/5 border border-purple-500/20 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
                            >
                                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <div className="text-purple-200 font-medium">{feature.text}</div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-8">
                        <button
                            onClick={onStart}
                            className="group relative inline-flex items-center gap-4 px-12 py-6 text-2xl font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-110"
                        >
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>

                            {/* Content */}
                            <span className="relative text-white flex items-center gap-4">
                                <span className="text-3xl">🚀</span>
                                Begin Your Journey
                                <span className="text-3xl">✨</span>
                            </span>
                        </button>
                    </div>

                    {/* Bottom text */}
                    <p className="text-purple-300/60 text-sm pt-8">
                        Create personalized stories that spark wonder and joy
                    </p>
                </div>
            </div>
        </div>
    );
}
