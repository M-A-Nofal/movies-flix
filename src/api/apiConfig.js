const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '9caa252b28f240bb8d7f483aadbf0d1c',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;