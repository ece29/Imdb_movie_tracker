# AI Movie Insight Builder

A full-stack web application built with **Next.js** and **Node.js** that fetches IMDb movie details using the OMDB API, scrapes audience reviews, and uses OpenAI to summarize sentiment and classify audience reactions.

## Features

- **Movie Search**: Enter an IMDb ID and fetch detailed movie information
- **Movie Details**: Display title, poster, cast, release year, rating, and plot
- **Audience Reviews**: Scrape reviews from IMDb
- **AI Sentiment Analysis**: Use OpenAI to summarize audience sentiment and classify as positive, mixed, or negative
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean UI**: Built with Tailwind CSS for modern, attractive styling
- **Error Handling**: Graceful error messages for invalid inputs and API failures

## Tech Stack

- **Frontend**: Next.js 16+ with React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js with Next.js API routes
- **APIs**: OMDB API, OpenAI GPT-4, IMDb (web scraping via Cheerio)
- **Testing**: Jest with ts-jest
- **Deployment**: Vercel (recommended)

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd movie-insight
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the project root:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   OMDB_API_KEY=your_omdb_api_key
   ```

   - Get OPENAI_API_KEY from [OpenAI Dashboard](https://platform.openai.com/account/api-keys)
   - Get OMDB_API_KEY from [OMDB API](http://www.omdbapi.com/apikey.aspx) (free tier available)

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Testing

```bash
npm test
```

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Add environment variables (OPENAI_API_KEY, OMDB_API_KEY) in Vercel dashboard
4. Deploy with one click

## Tech Stack Rationale

- **Next.js**: Full-stack solution with built-in API routes, SSR, and excellent performance
- **React 19**: Modern state management and component-based architecture
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Rapid, utility-first styling for responsive design
- **OpenAI API**: State-of-the-art AI for sentiment analysis
- **Cheerio**: Lightweight HTML parsing for web scraping
- **Axios**: Promise-based HTTP client for API requests

## Assumptions

- OMDB API key requires a free registration (limited to 1,000 requests/day)
- IMDb review scraping may require user-agent headers due to anti-bot measures
- OpenAI API calls incur costs; budget accordingly
- Sentiment classification can be positive, mixed, or negative

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── movie/
│   │       ├── route.ts        # Movie data fetching endpoint
│   │       └── route.test.ts   # Unit tests
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main UI component
├── globals.css                 # Global Tailwind styles
└── ...
public/                          # Static assets
.env.local                        # Environment variables (not in git)
jest.config.js                    # Jest configuration
next.config.ts                    # Next.js configuration
```

## API Endpoint

### GET `/api/movie`

Query Parameters:
- `imdbId` (required): IMDb movie ID (e.g., `tt0133093`)

Response:
```json
{
  "details": {
    "Title": "The Matrix",
    "Year": "1999",
    "Rated": "R",
    "Poster": "...",
    "Actors": "...",
    "Plot": "...",
    "imdbRating": "8.7"
  },
  "reviews": ["review1", "review2", ...],
  "ai": {
    "summary": "Mostly positive reviews praising the visuals and concept",
    "classification": "positive"
  }
}
```

## Error Handling

- Invalid IMDb IDs return 400 with descriptive error messages
- API failures (OMDB, OpenAI) return 500 with error details
- Frontend validates input and displays user-friendly messages

## Known Limitations

- IMDb review scraping may fail if the page structure changes
- OMDB API has rate limiting on free tier
- Sentiment analysis quality depends on review text quality and OpenAI's performance
- Some older movies may have limited review data

## Future Enhancements

- Add caching layer to reduce API calls
- Support multiple movie searches and comparisons
- Add movie recommendations based on sentiment
- Implement user ratings and comments
- Add advanced filters (genre, year, rating)

## License

MIT

## Contact

For questions or support: abhay@brew.tv
