async function apiClient(url, options) {
  async function intervalRetry(tryCount) {
    const signal = AbortSignal.timeout(options.timeout);
    try {
      console.log(`Attempting fetch: attempts left = ${tryCount}`);

      const response = await fetch(url, { signal });
      if (!response.ok) {
        let name = "HTTPError";
        let errMessage;
        let fatal;
        if (response.status >= 400 && response.status < 500) {
          errMessage = `Client Error: ${response.status}`;
          fatal = true;
        } else if (response.status >= 500) {
          errMessage = `Server Error: ${response.status}`;
          fatal = false;
        }
        throw {
          name: name,
          message: errMessage,
          status: response.status,
          fatal: fatal,
        };
      }
      const data = await response.json();
      return data;
    } catch (err) {
      if (err.name === "AbortError" || err.name === "TimeoutError") {
        throw {
          name: err.name,
          message: "Request took too long.",
          status: err.status || 0,
        };
      }

      if (err.fatal || tryCount <= 0) {
        throw {
          name: err.name || "NetworkError",
          message: err.message || "Failed after retries",
          status: err.status || 0,
        };
      }

      const delayDuration = (options.attempts - tryCount) * 500;
      const delayFn = new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve();
        }, delayDuration);
      });
      console.log(
        `Failed to fetch resource. Waiting ${delayDuration}ms before retry.`
      );
      await delayFn;
      return intervalRetry(tryCount - 1);
    }
  }

  return intervalRetry(options.attempts);
}

apiClient.parallel = async function (urls, options) {
  return Promise.allSettled(
    urls.map((url) => {
      return apiClient(url, options);
    })
  );
};

apiClient.fastest = async function (urls, options) {
  return Promise.race(
    urls.map((url) => {
      return apiClient(url, options);
    })
  );
};

// ======= NORMAL apiClient main() calls ==========
async function main(url, attempts) {
  const data = await apiClient(url, attempts);
  return data;
}

// main("https://api.github.com/users/get-a-bugatti", 3)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

main("https://jsonplaceholder.typicode.com/posts/1", {
  timeout: 3000,
  attempts: 2,
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
