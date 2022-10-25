const axios = require('axios');
const {
  isRetryRequired,
  getTimeout,
  createApiConfig,
} = require('./utils')

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    /**
     * on the error we need to check request config to handle
     * retry feature.
     */

     const statusCode = error.response.status
     const currentRetryCount = error.response.config.currentRetryCount ?? 0
     const totalRetry = error.response.config.retryCount ?? 0
     const retryStatusCodes = error.response.config.retryStatusCodes ?? []
     const backoff = error.response.config.backoff ?? 100
 
     if(isRetryRequired({
        statusCode, 
        retryStatusCodes, 
        currentRetryCount, 
        totalRetry })
     ) {
 
       error.config.currentRetryCount = 
           currentRetryCount === 0 ? 1 : currentRetryCount + 1;
 
      // Create a new promise with exponential backoff
      const backOffWithJitterTime = getTimeout(currentRetryCount, backoff);
      console.info(`${currentRetryCount+1} retry request going after ${backOffWithJitterTime} ms`)
      const waitTimeout = new Promise(function(resolve, _reject) {
           setTimeout(function() {
               resolve();
           }, backOffWithJitterTime);
       });
 
       await waitTimeout;
       return axios(createApiConfig(error.config));
     }
   }
 );
