import apiConfig from './apiConfig';


const apiRequests = {
    requestPopular: `${apiConfig.baseUrl}movie/popular?api_key=${apiConfig.apiKey}&language=en-US&page=1`,
    requestTopRated: `${apiConfig.baseUrl}movie/top_rated?api_key=${apiConfig.apiKey}&language=en-US&page=1`,
    requestTrending: `${apiConfig.baseUrl}movie/popular?api_key=${apiConfig.apiKey}&language=en-US&page=2`,
    requestHorror: `${apiConfig.baseUrl}search/movie?api_key=${apiConfig.apiKey}&language=en-US&query=horror&page=1&include_adult=false`,
    requestUpcoming: `${apiConfig.baseUrl}movie/upcoming?api_key=${apiConfig.apiKey}&language=en-US&page=1`,
    requestNowPlaying: `${apiConfig.baseUrl}/movie/now_playing?api_key=${apiConfig.apiKey}&language=en-US&page=1`,
    requestSimilar: (id) => `${apiConfig.baseUrl}/movie/${id}/similar?api_key=${apiConfig.apiKey}&language=en-US&page=1`,
    requestDetails: (id) => `${apiConfig.baseUrl}/movie/${id}?api_key=${apiConfig.apiKey}&language=en-US&page=1`

}
export default apiRequests;