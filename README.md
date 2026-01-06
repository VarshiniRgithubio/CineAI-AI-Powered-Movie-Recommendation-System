# Movie Recommendation Web App

A full-stack web application that recommends movies based on user preferences using OpenAI's ChatGPT API.

## 🎯 Features

- **AI-Powered Recommendations**: Uses OpenAI API to generate 3-5 personalized movie suggestions
- **Beautiful UI**: Modern, responsive React frontend with Vite
- **Fast Backend**: Built with Fastify for high performance
- **Persistent Storage**: SQLite database to save user inputs and recommendations
- **Search History**: View recent recommendation queries
- **Mobile Friendly**: Responsive design works on all devices

## 📋 Requirements

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API Key (get one at https://platform.openai.com/)

## 🚀 Quick Start

### 1. Clone or Download the Project

```bash
cd "f:\movie Recomendation"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

Replace `your_openai_api_key_here` with your actual OpenAI API key.

**To run the backend:**

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The backend will be available at `http://localhost:3001`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
```

**To run the frontend:**

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🔧 How to Use

1. Start both the backend and frontend servers (they must run simultaneously)
2. Open your browser to `http://localhost:3000`
3. Enter your movie preference (e.g., "Action movies with a strong female lead")
4. Click "Get Recommendations"
5. View the recommended movies with details like title, year, genre, and description

## 📁 Project Structure

```
movie-recommendation/
├── backend/
│   ├── server.js              # Main Fastify server
│   ├── database.js            # SQLite database setup and operations
│   ├── openaiService.js       # OpenAI API integration
│   ├── package.json
│   ├── .env.example           # Example environment variables
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── App.css            # Styles
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
└── README.md
```

## 🗄️ Database Schema

The SQLite database has a single table:

```sql
CREATE TABLE recommendations (
  id TEXT PRIMARY KEY,
  user_input TEXT NOT NULL,
  recommended_movies TEXT NOT NULL,
  timestamp TEXT NOT NULL
);
```

- **id**: Unique identifier (UUID)
- **user_input**: The user's movie preference query
- **recommended_movies**: JSON array of recommended movies
- **timestamp**: ISO 8601 timestamp

🔗 API Endpoints

POST /recommend  
Generate movie recommendations

Request:
{
  "preference": "action movies with strong female lead"
}

Response:
{
  "movies": ["Movie 1", "Movie 2", "Movie 3"]
}


## 🚀 Deployment

### Option 1: Deploy to Vercel (Recommended)

**Frontend Deployment:**

1. Create a GitHub repository with your code
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" and import your repository
4. Set root directory to `frontend`
5. Add environment variable (if needed): `VITE_API_URL=https://your-backend-url`
6. Deploy

**Backend Deployment:**

1. Go to [Render](https://render.com) or [Heroku](https://www.heroku.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set root directory to `backend`
5. Add environment variable: `OPENAI_API_KEY=your_key_here`
6. Deploy

### Option 2: Deploy to Netlify + Render

**Frontend:** Push to Netlify, connect GitHub repo
**Backend:** Push to Render, use Web Service

## 🔐 Environment Variables

**Backend (.env):**
- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `PORT`: Server port (default: 3001)

**Frontend (vite.config.js):**
- Update the proxy target if your backend is on a different URL

## 🧪 Testing Locally

1. Make sure both servers are running
2. Try these sample inputs:
   - "Sci-fi movies with incredible visuals"
   - "Romantic comedies from the 2000s"
   - "Psychological thrillers that keep you guessing"
   - "Marvel movies with the best storylines"

## 📝 Example API Call

```bash
curl -X POST http://localhost:3001/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{"userInput":"action movies with a strong female lead"}'
```

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Verify OpenAI API key is valid
- Check Node.js version (should be v16+)

### Frontend can't connect to backend
- Make sure backend is running on port 3001
- Check CORS settings in Fastify
- Verify proxy configuration in vite.config.js

### No recommendations returned
- Check OpenAI API key and account has credits
- Look for errors in browser console and terminal
- Verify API response format

## 📄 License

MIT

## 👥 Author

Movie Recommendation Web App

---

**Note:** Make sure to keep your OpenAI API key private. Never commit `.env` files to version control.
