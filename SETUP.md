# Getting Started with AI Movie Insight Builder

## Prerequisites

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org))
- **npm**: Comes with Node.js
- **API Keys**: 
  - OpenAI API key (for sentiment analysis)
  - OMDB API key (for movie details)

## Step 1: Get Your API Keys

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Sign up or log in
3. Navigate to "API keys"
4. Create a new secret key
5. Copy and save it securely

### OMDB API Key
1. Visit [OMDB API](http://www.omdbapi.com/apikey.aspx)
2. Select the **FREE** plan
3. Enter your email address
4. Check your email for the API key
5. Copy and save it securely

## Step 2: Clone or Create the Project

If you already have the project:
```bash
cd path/to/movie-insight
```

## Step 3: Install Dependencies

```bash
npm install
```

This installs:
- Next.js and React
- Tailwind CSS for styling
- axios for HTTP requests
- cheerio for web scraping
- OpenAI SDK
- Testing libraries

## Step 4: Configure Environment Variables

Create or edit `.env.local` in the project root:

```env
OPENAI_API_KEY=sk_your_key_here
OMDB_API_KEY=your_omdb_key_here
```

**Important**: Do NOT commit `.env.local` to git. It's already in `.gitignore`.

## Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will:
- Hot-reload on file changes
- Show TypeScript errors immediately
- Display API request logs

## Step 6: Test the Application

1. Find an IMDb movie ID:
   - Go to [IMDb.com](https://imdb.com)
   - Search for a movie
   - Copy the ID from the URL (e.g., `tt0133093` from `imdb.com/title/tt0133093`)

2. Enter the ID in the app
3. View movie details and sentiment analysis

## Building for Production

```bash
npm run build
npm start
```

The production build:
- Optimizes Next.js pages
- Bundles and minifies code
- Runs on port 3000 by default

## Running Tests

```bash
npm test
```

Currently includes basic test setup with Jest.

## Deploying to Vercel

### Option 1: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Using GitHub (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel Dashboard](https://vercel.com)
3. Add environment variables:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI key
   - Name: `OMDB_API_KEY`
   - Value: Your OMDB key
4. Click "Deploy"

## Troubleshooting

### "OMDB_API_KEY is not set"
- Ensure `.env.local` exists in project root
- Restart the dev server after adding keys
- Verify key format is correct

### "OpenAI API error"
- Check API key is valid
- Ensure you have API credits
- Check rate limits

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### Reviews not loading
- IMDb review scraping may fail due to page structure changes
- This is a known limitation mentioned in README.md

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm test` | Run tests |
| `npm run lint` | Check code quality |

## Directory Structure

```
src/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main page component
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   └── api/
│       └── movie/
│           └── route.ts     # Movie API endpoint
├── components/              # React components
│   ├── MovieCard.tsx
│   ├── SentimentDisplay.tsx
│   ├── ReviewsDisplay.tsx
│   └── SearchInput.tsx
└── lib/                     # Utilities
    └── utils.ts            # Helper functions
```

## Next Steps

- ✅ Install dependencies
- ✅ Add API keys
- ✅ Run dev server
- ✅ Test with movie IDs
- ✅ Deploy to Vercel

Need help? Contact: abhay@brew.tv
