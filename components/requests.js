const requests = {
  fetchTrending: `/trending/all/week?api_key=${process.env.API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${process.env.API_KEY}&with_networks=213`,
  fetchUpcomingMovies: `/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`,
  fetchTopRated: `/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=28`,
  fetchHorrorMovies: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=27`,
  fetchTrillerMovies: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=53`,
};

export default requests;
