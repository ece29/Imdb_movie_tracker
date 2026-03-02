import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { load } from 'cheerio';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function fetchMovieDetails(imdbId: string) {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    throw new Error('OMDB_API_KEY is not set.');
  }
  const url = `https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}&plot=short`;
  const resp = await axios.get(url);
  if (resp.data && resp.data.Response === 'True') {
    return resp.data;
  }
  throw new Error(resp.data.Error || 'Failed to fetch movie details');
}

async function fetchReviews(imdbId: string) {
  const url = `https://www.imdb.com/title/${imdbId}/reviews`;
  const resp = await axios.get(url, { headers: { 'Accept-Language': 'en-US,en;q=0.9' } });
  const $ = load(resp.data);
  const reviews: string[] = [];
  $('.review-container .text.show-more__control').each((i, el) => {
    const text = $(el).text().trim();
    if (text) reviews.push(text);
  });
  return reviews;
}

async function summarizeSentiment(reviews: string[]) {
  if (reviews.length === 0) return { summary: '', classification: 'mixed' };
  const prompt = `You are an assistant that reads movie audience reviews and provides a concise summary of the overall sentiment along with a classification of positive, mixed or negative.\n\nReviews:\n${reviews.join('\n---\n')}\n\nProvide a JSON object with keys \"summary\" and \"classification\".`;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 250
  });
  const text = completion.choices[0].message.content || '';
  try {
    return JSON.parse(text);
  } catch (e) {
    return { summary: text, classification: 'mixed' };
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imdbId = searchParams.get('imdbId');
  if (!imdbId) {
    return NextResponse.json({ error: 'imdbId is required' }, { status: 400 });
  }
  try {
    const details = await fetchMovieDetails(imdbId);
    const reviews = await fetchReviews(imdbId);
    const ai = await summarizeSentiment(reviews);
    return NextResponse.json({ details, reviews, ai });
  } catch (err: any) {
    console.error('API Error:', err);
    const status = err.response?.status || 500;
    const message = err.response?.data?.Error || err.message || 'Unknown error';
    return NextResponse.json({ error: `${message} (OMDB/OpenAI)` }, { status });
  }
}
