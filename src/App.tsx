import { useState } from "react";
import HomePage from "./components/HomePage";
import StoryBuilder from "./components/StoryBuilder";
import StoryPlayer from "./components/StoryPlayer";
import BackgroundMusic from "./components/BackgroundMusic";

interface StoryPage {
    text: string;
    imageUrl?: string;
    audioUrl?: string;
}

type AppView = "home" | "builder" | "player";

function App() {
    const [currentView, setCurrentView] = useState<AppView>("home");
    const [story, setStory] = useState<StoryPage[]>([]);

    const handleStoryGenerated = (generatedStory: StoryPage[]) => {
        setStory(generatedStory);
        setCurrentView("player");
    };

    const handleExitStory = () => {
        setCurrentView("builder");
    };

    const handleBackToHome = () => {
        setCurrentView("home");
        setStory([]);
    };

    return (
        <div className="app-container">
            {/* Background ambient music */}
            <BackgroundMusic />

            {currentView === "home" && (
                <HomePage onStart={() => setCurrentView("builder")} />
            )}

            {currentView === "builder" && (
                <StoryBuilder
                    onStoryGenerated={handleStoryGenerated}
                    onBack={handleBackToHome}
                />
            )}

            {currentView === "player" && story.length > 0 && (
                <StoryPlayer story={story} onExit={handleExitStory} />
            )}
        </div>
    );
}

export default App;
