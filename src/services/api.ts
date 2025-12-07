const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface StoryConfig {
    ageRange: string;
    theme: string;
    characterName: string;
    characterTraits: string;
    storyLength: string;
}

export interface StoryPage {
    text: string;
    imageUrl?: string;
    audioUrl?: string;
}

export interface StoryResponse {
    pages: StoryPage[];
    metadata: {
        title: string;
        ageRange: string;
        theme: string;
        characterName: string;
    };
}

export async function generateStory(config: StoryConfig): Promise<StoryPage[]> {
    try {
        const response = await fetch(`${API_URL}/api/story/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(config),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to generate story');
        }

        const data: StoryResponse = await response.json();
        return data.pages;
    } catch (error) {
        console.error('Error generating story:', error);
        throw error;
    }
}

export async function checkAPIHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/health`);
        return response.ok;
    } catch (error) {
        console.error('API health check failed:', error);
        return false;
    }
}
