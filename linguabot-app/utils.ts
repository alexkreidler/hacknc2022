/**
 * Wrap a promise API with a function that will attempt the promise over and over again
 * with exponential backoff until it resolves or reaches the maximum number of retries.
 *   - First retry: 500 ms + <random> ms
 *   - Second retry: 1000 ms + <random> ms
 *   - Third retry: 2000 ms + <random> ms
 * and so forth until maximum retries are met, or the promise resolves.
 */
 export const withRetries = ({ attempt, maxRetries }: { attempt: Promise<any>, maxRetries?: number }) => async (...args: any[]) => {
    const slotTime = 500;
    let retryCount = 0;
    do {
      try {
        // console.log('Attempting...', Date.now());
        return await attempt(...args);
      } catch (error) {
        const isLastAttempt = retryCount === maxRetries;
        if (isLastAttempt) {
          // Stack Overflow console doesn't show unhandled
          // promise rejections so lets log the error.
          console.error(error);
          return Promise.reject(error);
        }
      }
      const randomTime = Math.floor(Math.random() * slotTime);
      const delay = 2 ** retryCount * slotTime + randomTime;
      // Wait for the exponentially increasing delay period before retrying again.
      await new Promise(resolve => setTimeout(resolve, delay));
    } while (retryCount++ < maxRetries);
  }
  