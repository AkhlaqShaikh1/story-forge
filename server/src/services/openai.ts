import OpenAI from 'openai';
import { StoryConfig, StoryPage } from '../types';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStory(config: StoryConfig): Promise<StoryPage[]> {
    const { ageRange, theme, characterName, characterTraits, storyLength } = config;

    // Determine number of pages based on story length
    const pageCount = storyLength === 'short' ? 5 : storyLength === 'medium' ? 8 : 12;

    // Create a detailed prompt for the AI
    const prompt = `You are a creative children's story writer. Write an engaging, age-appropriate story with the following specifications:

- Age Range: ${ageRange} years old
- Theme: ${theme}
- Main Character: ${characterName}
- Character Traits: ${characterTraits}
- Number of Pages: ${pageCount}

Requirements:
1. Write exactly ${pageCount} pages
2. Each page should be 2-3 sentences (appropriate for ${ageRange} year olds)
3. The story should be imaginative, fun, and teach a positive lesson
4. Include vivid descriptions that would work well with illustrations
5. Make it engaging and easy to understand for the target age group
6. End with a satisfying conclusion

Format your response as a JSON array of objects, where each object has a "text" field containing the page content and a "prompt" field with a detailed image generation prompt for that page.

Example format:
[
  {
    "text": "Once upon a time...",
    "prompt": "A vibrant illustration of [detailed scene description], children's book style, colorful, warm lighting"
  }
]

Now write the complete story:`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an expert children's story writer who creates engaging, age-appropriate stories. You always respond with valid JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.8,
            max_tokens: 3000,
        });

        const response = completion.choices[0].message.content;
        if (!response) {
            throw new Error('No response from OpenAI');
        }

        // Parse the JSON response
        let storyPages: Array<{ text: string; prompt: string }>;
        try {
            // Try to extract JSON from the response
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                storyPages = JSON.parse(jsonMatch[0]);
            } else {
                storyPages = JSON.parse(response);
            }
        } catch (parseError) {
            console.error('Failed to parse OpenAI response:', response);
            throw new Error('Failed to parse story response');
        }

        // Convert to our StoryPage format and generate images
        const pages: StoryPage[] = await Promise.all(
            storyPages.map(async (page, index) => {
                let imageUrl: string | undefined;

                try {
                    // Generate image for this page
                    imageUrl = await generateImage(page.prompt, characterName, theme);
                } catch (error) {
                    console.error(`Failed to generate image for page ${index + 1}:`, error);
                    // Continue without image
                }

                return {
                    text: page.text,
                    imageUrl,
                    audioUrl: undefined // We can add TTS later if needed
                };
            })
        );

        return pages;
    } catch (error) {
        console.error('Error generating story:', error);
        throw new Error('Failed to generate story. Please try again.');
    }
}

export async function generateImage(prompt: string, characterName: string, theme: string): Promise<string> {
    try {
        const enhancedPrompt = `${prompt}. Children's book illustration style, vibrant colors, friendly and engaging, digital art, high quality, featuring ${characterName} in a ${theme} themed scene.`;

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: enhancedPrompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
        });

        return response?.data?.[0].url || '';
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
}
