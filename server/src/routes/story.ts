import express from 'express';
import { z } from 'zod';
import { generateStory } from '../services/openai';
import { StoryConfig } from '../types';

const router = express.Router();

// Validation schema
const storyConfigSchema = z.object({
    ageRange: z.enum(['3-5', '6-8', '9-12']),
    theme: z.enum(['adventure', 'friendship', 'animals', 'fantasy', 'learning', 'nature']),
    characterName: z.string().min(1).max(20),
    characterTraits: z.string().max(100),
    storyLength: z.enum(['short', 'medium', 'long']),
});

// Generate a new story
router.post('/generate', async (req, res) => {
    try {
        // Validate request body
        const validationResult = storyConfigSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                error: 'Invalid request data',
                details: validationResult.error.errors
            });
        }

        const config: StoryConfig = validationResult.data;

        console.log('Generating story with config:', config);

        // Generate the story
        const pages = await generateStory(config);

        // Return the story
        res.json({
            pages,
            metadata: {
                title: `The Adventures of ${config.characterName}`,
                ageRange: config.ageRange,
                theme: config.theme,
                characterName: config.characterName,
            }
        });

    } catch (error: any) {
        console.error('Error in /generate endpoint:', error);
        res.status(500).json({
            error: error.message || 'Failed to generate story'
        });
    }
});

// Health check for story service
router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'story-generation',
        openaiConfigured: !!process.env.OPENAI_API_KEY
    });
});

export default router;
