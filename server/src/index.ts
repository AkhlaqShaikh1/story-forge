import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import storyRoutes from './routes/story';

dotenv.config();

console.log('Environment Variables:');
console.log(`PORT: ${process.env.PORT}`);
console.log(`FRONTEND_URL: ${process.env.FRONTEND_URL}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV ? 'set' : 'not set'}`);
console.log(`GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? 'set' : 'not set'}`);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/story', storyRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Story Generator API is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 Story Generator API ready!`);
});
