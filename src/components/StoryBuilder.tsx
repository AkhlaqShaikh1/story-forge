import { useState } from "react";

interface StoryConfig {
    ageRange: string;
    theme: string;
    characterName: string;
    characterTraits: string;
    storyLength: string;
}

interface StoryPage {
    text: string;
    imageUrl?: string;
    audioUrl?: string;
}

interface StoryBuilderProps {
    onStoryGenerated: (story: StoryPage[]) => void;
    onBack: () => void;
}

export default function StoryBuilder({ onStoryGenerated, onBack }: StoryBuilderProps) {
    const [step, setStep] = useState<"config" | "generating">("config");
    const [config, setConfig] = useState<StoryConfig>({
        ageRange: "",
        theme: "",
        characterName: "",
        characterTraits: "",
        storyLength: "short",
    });

    const ageRanges = [
        { value: "3-5", label: "3-5 Years", icon: "🧒", description: "Simple words & short stories", gradient: "from-pink-400 via-rose-400 to-pink-500" },
        { value: "6-8", label: "6-8 Years", icon: "👧", description: "Fun adventures & lessons", gradient: "from-sky-400 via-blue-400 to-indigo-500" },
        { value: "9-12", label: "9-12 Years", icon: "👦", description: "Exciting tales & challenges", gradient: "from-emerald-400 via-teal-400 to-cyan-500" }
    ];

    const themes = [
        { value: "adventure", label: "Adventure", icon: "🗺️", gradient: "from-amber-400 via-orange-500 to-red-500", description: "Epic quests & exploration" },
        { value: "friendship", label: "Friendship", icon: "🤝", gradient: "from-sky-400 via-blue-500 to-violet-500", description: "Bonds that never break" },
        { value: "animals", label: "Animals", icon: "🦁", gradient: "from-yellow-400 via-amber-500 to-orange-500", description: "Creatures & wild adventures" },
        { value: "fantasy", label: "Fantasy", icon: "🦄", gradient: "from-fuchsia-400 via-pink-500 to-purple-500", description: "Magic & mythical realms" },
        { value: "learning", label: "Learning", icon: "📚", gradient: "from-emerald-400 via-green-500 to-teal-500", description: "Discover & grow wiser" },
        { value: "nature", label: "Nature", icon: "🌳", gradient: "from-lime-400 via-green-500 to-emerald-500", description: "Earth's wonders await" }
    ];

    const storyLengths = [
        { value: "short", label: "Bedtime Story", icon: "🌙", pages: "3-5 pages", gradient: "from-indigo-400 via-purple-500 to-pink-500", description: "Quick & cozy" },
        { value: "medium", label: "Story Time", icon: "📖", pages: "6-10 pages", gradient: "from-violet-400 via-fuchsia-500 to-pink-500", description: "Just right" },
        { value: "long", label: "Adventure Tale", icon: "🏰", pages: "11-15 pages", gradient: "from-rose-400 via-pink-500 to-fuchsia-500", description: "Epic journey" }
    ];

    const handleGenerateStory = () => {
        setStep("generating");

        // Simulate story generation - replace with actual API call later
        setTimeout(() => {
            const mockStory: StoryPage[] = [
                {
                    text: `Once upon a time, in a land where magic sparkled in the air, there lived a ${
                        config.characterTraits || "brave"
                    } child named ${config.characterName || "Alex"}.`,
                    imageUrl: undefined,
                    audioUrl: undefined,
                },
                {
                    text: `${
                        config.characterName || "Alex"
                    } loved to explore the enchanted forests and discover new wonders every single day.`,
                    imageUrl: undefined,
                    audioUrl: undefined,
                },
                {
                    text: `One magical morning, ${config.characterName || "Alex"} found a mysterious glowing portal hidden behind the ancient oak tree.`,
                    imageUrl: undefined,
                    audioUrl: undefined,
                },
                {
                    text: `Taking a deep breath, our hero stepped through the portal and emerged in a world filled with floating islands and rainbow waterfalls.`,
                    imageUrl: undefined,
                    audioUrl: undefined,
                },
                {
                    text: `"Welcome, young adventurer!" said a friendly dragon with scales that shimmered like diamonds. "We've been waiting for someone just like you!"`,
                    imageUrl: undefined,
                    audioUrl: undefined,
                },
            ];
            onStoryGenerated(mockStory);
        }, 3000);
    };

    const isConfigComplete = config.ageRange && config.theme && config.characterName;

    if (step === "generating") {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden flex items-center justify-center px-4">
                {/* Animated background */}
                <div className="absolute inset-0">
                    <div className="stars"></div>
                    <div className="stars2"></div>
                    <div className="stars3"></div>
                </div>

                {/* Pulsing glow effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Spinning orbs */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                        <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-600 to-pink-600 opacity-20 blur-2xl animate-spin-slow"></div>
                        <div className="absolute inset-8 rounded-full bg-linear-to-r from-blue-600 to-purple-600 opacity-30 blur-xl animate-spin-reverse"></div>
                    </div>
                </div>

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <div className="backdrop-blur-2xl bg-white/5 border border-purple-500/30 rounded-3xl p-12 shadow-2xl">
                        {/* Loading animation */}
                        <div className="relative w-32 h-32 mx-auto mb-8">
                            <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-pink-500 border-b-transparent border-l-transparent animate-spin"></div>
                            <div className="absolute inset-4 rounded-full border-4 border-pink-500/20"></div>
                            <div className="absolute inset-4 rounded-full border-4 border-t-transparent border-r-transparent border-b-pink-500 border-l-purple-500 animate-spin-reverse"></div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-8">
                            Crafting Your Story
                        </h2>

                        <div className="space-y-6">
                            {[
                                { icon: "✍️", text: "Writing your magical adventure", delay: "0s" },
                                { icon: "🎨", text: "Painting beautiful illustrations", delay: "0.5s" },
                                { icon: "🎵", text: "Composing audio narration", delay: "1s" },
                                { icon: "✨", text: "Sprinkling magic dust", delay: "1.5s" },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-center gap-4 text-purple-200 text-lg animate-pulse"
                                    style={{ animationDelay: item.delay }}
                                >
                                    <span className="text-3xl">{item.icon}</span>
                                    <span className="font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-purple-400/60 text-sm">
                            This may take a few moments...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="stars"></div>
                <div className="stars2"></div>
                <div className="stars3"></div>
            </div>

            {/* Animated glow orbs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

            <div className="relative z-10 min-h-screen px-4 py-8">
                {/* Back button with holographic effect */}
                <div className="mb-8">
                    <button
                        onClick={onBack}
                        className="group relative flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-purple-500/30 hover:border-purple-500/50 rounded-full backdrop-blur-xl transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <svg className="w-5 h-5 text-purple-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-purple-200 font-medium relative z-10">Back</span>
                    </button>
                </div>

                {/* Header with animated gradient */}
                <header className="text-center mb-16 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-linear-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 blur-3xl"></div>
                    <h1 className="relative text-5xl md:text-7xl font-black bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-gradient-x">
                        Build Your Story
                    </h1>
                    <p className="text-xl md:text-2xl text-purple-200/90 font-light">
                        Customize every detail of your adventure
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-2">
                        <div className="h-1 w-16 bg-linear-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
                        <div className="text-purple-400">✨</div>
                        <div className="h-1 w-16 bg-linear-to-r from-transparent via-pink-500 to-transparent rounded-full"></div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto space-y-12 pb-12">
                    {/* Age Selection with holographic cards */}
                    <div className="group/section relative backdrop-blur-2xl bg-white/5 border border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                        <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-0 group-hover/section:opacity-20 blur transition-opacity duration-500"></div>
                        <div className="relative">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="text-4xl animate-float">🎂</div>
                                    <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Select Age Range
                                    </h2>
                                    <div className="text-4xl animate-float" style={{ animationDelay: '1s' }}>🎈</div>
                                </div>
                                <p className="text-purple-300/70 text-sm md:text-base">Choose the perfect reading level</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                {ageRanges.map((age, idx) => (
                                    <button
                                        key={age.value}
                                        onClick={() => setConfig({ ...config, ageRange: age.value })}
                                        className={`group/card relative overflow-hidden rounded-2xl p-8 transition-all duration-500 ${
                                            config.ageRange === age.value
                                                ? "scale-105 shadow-2xl shadow-purple-500/50 ring-2 ring-purple-400/50"
                                                : "hover:scale-105 hover:shadow-xl"
                                        }`}
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        <div className={`absolute inset-0 bg-linear-to-br ${age.gradient} ${
                                            config.ageRange === age.value ? "opacity-100" : "opacity-80"
                                        } group-hover/card:opacity-100 transition-opacity duration-500`}></div>

                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000"></div>

                                        <div className="relative z-10 text-center text-white">
                                            <div className="text-7xl mb-4 transform group-hover/card:scale-110 transition-transform duration-300">{age.icon}</div>
                                            <div className="text-2xl font-bold mb-2">{age.label}</div>
                                            <div className="text-sm opacity-90 font-medium">{age.description}</div>
                                        </div>

                                        {config.ageRange === age.value && (
                                            <div className="absolute top-4 right-4 bg-white rounded-full p-2 animate-scale-in shadow-lg">
                                                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Glow on selected */}
                                        {config.ageRange === age.value && (
                                            <div className="absolute -inset-1 bg-linear-to-br from-white/30 via-transparent to-white/30 rounded-2xl blur-sm -z-10"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Theme Selection with enhanced visuals */}
                    <div className="group/section relative backdrop-blur-2xl bg-white/5 border border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-pink-500/20 transition-all duration-500">
                        <div className="absolute -inset-0.5 bg-linear-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl opacity-0 group-hover/section:opacity-20 blur transition-opacity duration-500"></div>
                        <div className="relative">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="text-4xl animate-float">🎭</div>
                                    <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                        Choose Your Theme
                                    </h2>
                                    <div className="text-4xl animate-float" style={{ animationDelay: '1s' }}>🌟</div>
                                </div>
                                <p className="text-purple-300/70 text-sm md:text-base">Pick the perfect story world</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                                {themes.map((theme, idx) => (
                                    <button
                                        key={theme.value}
                                        onClick={() => setConfig({ ...config, theme: theme.value })}
                                        className={`group/card relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-500 ${
                                            config.theme === theme.value
                                                ? "scale-110 shadow-2xl shadow-pink-500/50 ring-2 ring-pink-400/50 z-10"
                                                : "hover:scale-105 hover:shadow-xl"
                                        }`}
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        <div className={`absolute inset-0 bg-linear-to-br ${theme.gradient} ${
                                            config.theme === theme.value ? "opacity-100" : "opacity-80"
                                        } group-hover/card:opacity-100 transition-opacity duration-500`}></div>

                                        {/* Animated particles */}
                                        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity">
                                            {[...Array(3)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="absolute w-1 h-1 bg-white rounded-full animate-float"
                                                    style={{
                                                        left: `${20 + i * 30}%`,
                                                        top: `${30 + i * 20}%`,
                                                        animationDelay: `${i * 0.3}s`,
                                                    }}
                                                ></div>
                                            ))}
                                        </div>

                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000"></div>

                                        <div className="relative z-10 text-center text-white">
                                            <div className="text-6xl md:text-7xl mb-3 transform group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-300">{theme.icon}</div>
                                            <div className="text-lg md:text-xl font-bold mb-1">{theme.label}</div>
                                            <div className="text-xs opacity-80">{theme.description}</div>
                                        </div>

                                        {config.theme === theme.value && (
                                            <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 animate-scale-in shadow-lg">
                                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}

                                        {config.theme === theme.value && (
                                            <div className="absolute -inset-1 bg-linear-to-br from-white/30 via-transparent to-white/30 rounded-2xl blur-sm -z-10"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Character Customization with glowing inputs */}
                    <div className="group/section relative backdrop-blur-2xl bg-white/5 border border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover/section:opacity-20 blur transition-opacity duration-500"></div>
                        <div className="relative">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="text-4xl animate-float">🦸</div>
                                    <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        Create Your Hero
                                    </h2>
                                    <div className="text-4xl animate-float" style={{ animationDelay: '1s' }}>⚡</div>
                                </div>
                                <p className="text-purple-300/70 text-sm md:text-base">Make them uniquely yours</p>
                            </div>
                            <div className="max-w-2xl mx-auto space-y-8">
                                <div className="group/input">
                                    <label className="flex text-purple-200 text-lg md:text-xl font-semibold mb-4 items-center gap-2">
                                        <span className="text-2xl">✨</span>
                                        Hero's Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Enter a magical name..."
                                            value={config.characterName}
                                            onChange={(e) => setConfig({ ...config, characterName: e.target.value })}
                                            maxLength={20}
                                            className="w-full px-6 py-5 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-purple-500/30 text-purple-100 placeholder-purple-400/50 text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white/15 transition-all duration-300"
                                        />
                                        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 opacity-0 group-focus-within/input:opacity-100 pointer-events-none transition-opacity duration-300"></div>
                                    </div>
                                </div>
                                <div className="group/input">
                                    <label className="flex text-purple-200 text-lg md:text-xl font-semibold mb-4 items-center gap-2">
                                        <span className="text-2xl">🌟</span>
                                        Character Traits
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="brave, curious, kind..."
                                            value={config.characterTraits}
                                            onChange={(e) => setConfig({ ...config, characterTraits: e.target.value })}
                                            maxLength={50}
                                            className="w-full px-6 py-5 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-purple-500/30 text-purple-100 placeholder-purple-400/50 text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white/15 transition-all duration-300"
                                        />
                                        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-pink-600/0 via-pink-600/20 to-pink-600/0 opacity-0 group-focus-within/input:opacity-100 pointer-events-none transition-opacity duration-300"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Story Length with epic cards */}
                    <div className="group/section relative backdrop-blur-2xl bg-white/5 border border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                        <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl opacity-0 group-hover/section:opacity-20 blur transition-opacity duration-500"></div>
                        <div className="relative">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="text-4xl animate-float">📏</div>
                                    <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Story Length
                                    </h2>
                                    <div className="text-4xl animate-float" style={{ animationDelay: '1s' }}>⏱️</div>
                                </div>
                                <p className="text-purple-300/70 text-sm md:text-base">How long should the adventure be?</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                {storyLengths.map((length, idx) => (
                                    <button
                                        key={length.value}
                                        onClick={() => setConfig({ ...config, storyLength: length.value })}
                                        className={`group/card relative overflow-hidden rounded-2xl p-8 md:p-10 transition-all duration-500 ${
                                            config.storyLength === length.value
                                                ? "scale-105 shadow-2xl shadow-purple-500/50 ring-2 ring-purple-400/50"
                                                : "hover:scale-105 hover:shadow-xl"
                                        }`}
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        <div className={`absolute inset-0 bg-linear-to-br ${length.gradient} ${
                                            config.storyLength === length.value ? "opacity-100" : "opacity-80"
                                        } group-hover/card:opacity-100 transition-opacity duration-500`}></div>

                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000"></div>

                                        <div className="relative z-10 text-center text-white">
                                            <div className="text-7xl mb-5 transform group-hover/card:scale-110 transition-transform duration-300">{length.icon}</div>
                                            <div className="text-2xl md:text-3xl font-bold mb-3">{length.label}</div>
                                            <div className="text-base opacity-90 mb-2">{length.pages}</div>
                                            <div className="text-sm opacity-75 font-medium">{length.description}</div>
                                        </div>

                                        {config.storyLength === length.value && (
                                            <div className="absolute top-4 right-4 bg-white rounded-full p-2 animate-scale-in shadow-lg">
                                                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}

                                        {config.storyLength === length.value && (
                                            <div className="absolute -inset-1 bg-linear-to-br from-white/30 via-transparent to-white/30 rounded-2xl blur-sm -z-10"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Generate Button with epic effects */}
                    <div className="text-center pt-8">
                        <div className="relative inline-block">
                            {isConfigComplete && (
                                <div className="absolute -inset-8 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                            )}
                            <button
                                onClick={handleGenerateStory}
                                disabled={!isConfigComplete}
                                className={`relative group/btn inline-flex items-center gap-4 px-16 py-8 text-2xl md:text-3xl font-bold rounded-full transition-all duration-500 ${
                                    isConfigComplete
                                        ? "bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:scale-110 shadow-2xl shadow-purple-500/50 cursor-pointer animate-gradient-x"
                                        : "bg-white/10 text-purple-400/50 cursor-not-allowed border border-purple-500/20"
                                }`}
                            >
                                {isConfigComplete && (
                                    <>
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                                    </>
                                )}

                                <span className="text-4xl transform group-hover/btn:scale-125 transition-transform duration-300">
                                    {isConfigComplete ? "🎨" : "⏳"}
                                </span>
                                <span className="relative font-black tracking-wide">Create My Story</span>
                                <span className="text-4xl transform group-hover/btn:scale-125 transition-transform duration-300">
                                    {isConfigComplete ? "✨" : "⏳"}
                                </span>
                            </button>
                        </div>

                        {!isConfigComplete && (
                            <p className="text-purple-400/70 mt-8 text-lg animate-pulse">
                                Please select age, theme, and enter a character name
                            </p>
                        )}

                        {isConfigComplete && (
                            <p className="text-purple-300/90 mt-8 text-lg font-medium animate-float">
                                Ready to create something magical? ✨
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
