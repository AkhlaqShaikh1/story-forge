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
