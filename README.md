# AI YouTube Summarizer  
The YouTube Video Summarizer is a full-stack web application that allows users to input a YouTube video URL and receive an AI-generated summary and key insights from the video content.

## Features  
Extracts and summarizes YouTube video transcripts  
Provides key insights from the video content  
Clean and user-friendly UI  
Real-time progress animation  
Supports multiple languages  

## Tech Stack  
- **Frontend:** React, Tailwind CSS, Framer Motion  
- **Backend:** Express.js, Node.js, Prisma ORM  
- **Database:** PostgreSQL  
- **AI Model:** Mistral API  
- **Deployment:** Vercel / Render  

## Project Structure

```
AI-YouTube-Summarizer/
├── backend/                # Express.js server & API logic
│   ├── prisma/             # Prisma ORM setup
│   ├── routes/             # API route handlers
│   ├── controllers/        # Business logic
│   ├── middleware/         # JWT Authentication & security
│   ├── services/           # AI processing & YouTube API integration
│   ├── app.js              # Main Express app entry point
│   └── .env                # Environment variables
│
├── frontend/               # React App
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # App pages (Home, Summary, Login, etc.)
│   │   ├── hooks/          # Custom React Hooks
│   │   ├── styles/         # Tailwind CSS styles
│   │   ├── utils/          # Helper functions
│   │   ├── App.js          # Main React component
│   │   ├── index.js        # ReactDOM entry point
│   ├── public/             # Static assets
│   └── .env                # Frontend environment variables
│
├── README.md               # Project documentation
├── package.json            # Dependencies & scripts
├── .gitignore              # Ignored files
└── LICENSE                 # License file

```
## API Endpoints

| API Endpoint                          | Description                                   |
| ------------------------------------- | --------------------------------------------- |
| POST /api/video/analyze               | # Submit URL for analysis                     |
| GET  /api/videos/:id                  | # Get analysis results                        |
| GET  /api/videos                      | # List previous summaries                     |
| DELETE /api/videos/:id/delete         | # Delete a video analyses from the database   |

##  Installation & Setup

### Clone the Repository  
```sh
git clone https://github.com/mhamxed/ai-youtube-summarizer.git
cd ai-youtube-summarizer
```

### Backend Setup
```sh
cd backend
npm install
```

### Create a .env file inside the backend directory

```
SECRET_KEY=your_jwt_secret
YOUTUBE_API_KEY=your_youtube_api_key
AI_API_KEY=your_ai_model_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/yourdatabase
```

### Run Prisma migrations

```sh
npx prisma migrate dev
```

### Start the backend server

```sh
npm run dev
```

### Frontend Setup

```sh
cd frontend
npm install
```

### Create a .env file inside the frontend directory
```
VITE_API_URL=http://localhost:8000/
VITE_YOUTUBE_API_KEY=your_youtube_api_key
```

### Start the frontend server

```sh
npm run dev
```

## Usage

1. Enter a YouTube video URL.

2. Click Summarize to analyze the video.

3. View the AI-generated summary and key insights.

4. Save or share your summaries.

## Contributing

Feel free to contribute! Fork this repo, create a feature branch, and submit a PR.

## License

This project is licensed under the MIT License.

