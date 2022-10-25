const { pick } = require('lodash');

function isRetryRequired({ statusCode, retryStatusCodes, currentRetryCount, totalRetry}) {
    return (statusCode >= 500 || retryStatusCodes.includes(statusCode))
        && currentRetryCount < totalRetry;
}
    
function getTimeout(numRetries, backoff) {
    const waitTime = Math.min(1000, backoff * (2 ** numRetries));

    // Multiply waitTime by a random number between 0 and 1.
    return Math.random() * waitTime;
}
  
function createApiConfig(config) {
    const updatedConfig = pick(config, [
        'method',
        'url',
        'retryCount',
        'retryStatusCodes',
        'backoff',
        'timeout',
        'currentRetryCount'
    ]);

    // Intentionally changing response to success for the last retry
    if(updatedConfig.currentRetryCount === updatedConfig.retryCount) {
        updatedConfig.url = 'https://mock.codes/200';
    }

    return updatedConfig;
}

module.exports = {
    isRetryRequired,
    getTimeout,
    createApiConfig,
}