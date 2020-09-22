const config = {
  API_ENDPOINT:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3030/api'
      : 'https://desolate-island-86140.herokuapp.com/',
};

export default config;
