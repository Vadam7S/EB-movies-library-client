export const moviesPageConstants = {
  defaultMessageDuration: 5000,
  emptyString: ''
};

export enum MoviesPageLabels {
  authenticationError = 'Authentication failed. Please verify your credentials.',
  close = 'Close',
  connectionError = 'Unable to connect to the server. Please check your connection.',
  error = 'An error has occurred...',
  noSearchResults = 'No movies found matching your search criteria.',
  permissionError = 'You are not authorized to perform this operation.',
  popularMovies = 'Popular movies:',
  resourceNotFound = 'The requested resource was not found.',
  retrievingInformation = 'Retrieving information...',
  search = 'Search',
  searchMovie = 'Search movie',
  searchMoviePlaceholder = 'E.g The Dark Knight',
  searchResults = 'Search results for: ',
  serviceUnavailable = 'The service is temporarily unavailable. Please try again later.',
  tooManyRequests = 'Too many requests. Please try again later.',
  unexpectedError = 'An unexpected error occurred. Please try again.'
};

export const TmdbErrorCodes = {
  connectionError: 0,
  authenticationError: 401,
  permissionError: 403,
  resourceNotFound: 404,
  serviceUnavailable: {
    errorCode500: 500,
    errorCode502: 502,
    errorCode503: 503,
    errorCode504: 504,
  },
  tooManyRequests: 429
};
