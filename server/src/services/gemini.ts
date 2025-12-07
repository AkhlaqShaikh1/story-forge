import { GoogleGenAI } from '@google/genai';
import { StoryConfig, StoryPage } from '../types';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
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

Format your response as a JSON array of objects, where each object has a "text" field containing the page content and a "imagePrompt" field with a detailed image generation prompt for that page.

Example format:
[
  {
    "text": "Once upon a time...",
    "imagePrompt": "A vibrant illustration of [detailed scene description], children's book style, colorful, warm lighting, digital art"
  }
]

IMPORTANT: Return ONLY the JSON array, no additional text before or after.

Now write the complete story:`;

    try {
        const result = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const response = result.text;
        if (!response) {
            throw new Error('No response from Gemini');
        }

        // Parse the JSON response
        let storyPages: Array<{ text: string; imagePrompt: string }>;
        try {
            // Try to extract JSON from the response
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                storyPages = JSON.parse(jsonMatch[0]);
            } else {
                storyPages = JSON.parse(response);
            }
        } catch (parseError) {
            console.error('Failed to parse Gemini response:', response);
            throw new Error('Failed to parse story response');
        }

        // Generate ONE image for the first page only to respect rate limits
        let coverImageUrl: string | undefined;
        try {
            console.log('Generating cover image...');
            coverImageUrl = await generateImage(
                `${characterName}, the ${characterTraits} hero, in a ${theme} adventure. Children's book cover illustration.`,
                characterName,
                theme
            );
            console.log('Cover image generated successfully!');
        } catch (error) {
            console.error('Failed to generate cover image:', error);
            // Continue without image
        }

        // Convert to our StoryPage format - only first page gets the image
        const pages: StoryPage[] = storyPages.map((page, index) => ({
            text: page.text,
            imageUrl: index === 0 ? coverImageUrl : undefined, // Only first page gets the image
            audioUrl: undefined
        }));

        return pages;
    } catch (error) {
        console.error('Error generating story:', error);
        throw new Error('Failed to generate story. Please try again.');
    }
}

export async function generateImage(prompt: string, characterName: string, theme: string): Promise<string> {
    try {
        const enhancedPrompt = `${prompt}. Children's book illustration style, vibrant colors, friendly and engaging, digital art, high quality, whimsical, featuring ${characterName} in a ${theme} themed scene. Colorful, detailed, professional children's book art.`;

        // Use Gemini 2.5 Flash with image generation capability
        const result = await genAI.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: enhancedPrompt,
        });

        // Extract image from response
        for (const candidate of result.candidates || []) {
            for (const part of candidate.content?.parts || []) {
                if (part.inlineData) {
                    // Convert base64 image to data URL
                    const imageData = part.inlineData.data;
                    const mimeType = part.inlineData.mimeType || 'image/png';
                    return `data:${mimeType};base64,${imageData}`;
                }
            }
        }

        throw new Error('No image generated');
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
}

// Alternative: Use Imagen API for higher quality images
export async function generateImageWithImagen(prompt: string, characterName: string, theme: string): Promise<string> {
    try {
        const enhancedPrompt = `${prompt}. Children's book illustration style, vibrant colors, friendly and engaging, digital art, high quality, whimsical, featuring ${characterName} in a ${theme} themed scene. Colorful, detailed, professional children's book art.`;

        const response = await genAI.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: enhancedPrompt,
            config: {
                numberOfImages: 1,
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const imageBytes = response?.generatedImages?.[0].image?.imageBytes;
            // Convert to base64 data URL
            if (imageBytes) {
                const base64 = Buffer.from(imageBytes).toString('base64');
                return `data:image/png;base64,${base64}`;
            }
        }

        throw new Error('No image generated from Imagen');
    } catch (error) {
        console.error('Error generating image with Imagen:', error);
        throw error;
    }
}
