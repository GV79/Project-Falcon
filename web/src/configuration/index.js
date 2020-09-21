const config = {
  API_ENDPOINT: process.env.NODE_ENV === 'development' ? 'http://localhost:3030' : 'https://someserver.com',
};

export default config;
