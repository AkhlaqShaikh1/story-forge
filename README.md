# AI Children Story Generator 📚✨

A futuristic, AI-powered story generator for children with beautiful illustrations and calming nature sounds.

## Features

- 🎨 AI-generated personalized stories with DALL-E illustrations
- 🌟 Futuristic, animated UI with starfield backgrounds
- 📖 Book-style story player with page navigation
- 🎵 Calming nature-inspired ambient music (4 different soundscapes)
- 🎭 Customizable story parameters:
  - Age range (3-5, 6-8, 9-12 years)
  - Theme (Adventure, Friendship, Animals, Fantasy, Learning, Nature)
  - Character name and traits
  - Story length (Short, Medium, Long)

## Tech Stack

### Frontend
- React + TypeScript
- Vite
- TailwindCSS
- Web Audio API for ambient music

### Backend
- Node.js + Express + TypeScript
- OpenAI API (GPT-4o-mini for stories, DALL-E 3 for images)
- Zod for validation

## Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd AI-Children-Story-Generator
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
```

4. Set up environment variables

Frontend (.env):
```
VITE_API_URL=http://localhost:3001
```

Backend (server/.env):
```
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Running Locally

1. Start the backend server
```bash
cd server
npm run dev
```

2. Start the frontend (in a new terminal)
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## Deployment to Railway

### Backend Deployment

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add a new service and select the `server` directory as the root
4. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your deployed frontend URL (update after frontend deployment)
5. Railway will automatically deploy your backend
6. Copy the deployed backend URL

### Frontend Deployment

1. Update the frontend `.env` file with your Railway backend URL:
```
VITE_API_URL=https://your-backend-url.railway.app
```

2. Build the frontend
```bash
npm run build
```

3. Deploy the `dist` folder to your preferred hosting (Vercel, Netlify, or Railway)

4. Update the backend `FRONTEND_URL` environment variable on Railway to your deployed frontend URL

## Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:3001)

### Backend
- `PORT`: Server port (default: 3001)
- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend URL for CORS

## API Endpoints

### POST /api/story/generate
Generate a new story with illustrations

**Request Body:**
```json
{
  "ageRange": "6-8",
  "theme": "adventure",
  "characterName": "Luna",
  "characterTraits": "brave, curious",
  "storyLength": "short"
}
```

**Response:**
```json
{
  "pages": [
    {
      "text": "Once upon a time...",
      "imageUrl": "https://...",
      "audioUrl": null
    }
  ],
  "metadata": {
    "title": "The Adventures of Luna",
    "ageRange": "6-8",
    "theme": "adventure",
    "characterName": "Luna"
  }
}
```

### GET /health
Health check endpoint

## Project Structure

```
AI-Children-Story-Generator/
├── src/                    # Frontend source
│   ├── components/         # React components
│   │   ├── HomePage.tsx
│   │   ├── StoryBuilder.tsx
│   │   ├── StoryPlayer.tsx
│   │   └── BackgroundMusic.tsx
│   ├── services/           # API services
│   │   └── api.ts
│   ├── App.tsx
│   └── index.css
├── server/                 # Backend source
│   ├── src/
│   │   ├── index.ts        # Express server
│   │   ├── routes/         # API routes
│   │   ├── services/       # OpenAI integration
│   │   └── types.ts
│   └── package.json
└── README.md
```

## License

MIT

## Credits

Created with Claude Code ✨
