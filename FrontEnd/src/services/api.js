import axios from 'axios';

const NEWSAPI_KEY = process.env.REACT_APP_NEWSAPI_KEY;
const GITHUB_API = 'https://api.github.com';

// Fetch cybersecurity news
export const fetchCybersecurityNews = async () => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'cybersecurity',
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: 10,
        apiKey: NEWSAPI_KEY
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

// Fetch DummyJSON data for attacks/incidents
export const fetchDummyData = async (endpoint) => {
  try {
    const response = await axios.get(`https://dummyjson.com/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Search GitHub users
export const searchGitHubUsers = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API}/search/users`, {
      params: {
        q: username,
        per_page: 10
      }
    });
    return response.data.items;
  } catch (error) {
    console.error('Error searching GitHub:', error);
    throw error;
  }
};