async function apiClient(url, options) {
  const signal = AbortSignal.timeout(options.timeout);

  async function intervalRetry(tryCount) {
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
      apiClient(url, options);
    })
  );
};

apiClient.fastest = async function (urls, options) {
  return Promise.race(
    urls.map((url) => {
      apiClient(url, options);
    })
  );
};

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

// main("https://fake-domain-2398.com/whatever", { timeout: 15000, attempts: 3 })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function testParallelMixed() {
//   console.log("\n=== testParallelMixed ===");

//   const urls = [
//     "https://jsonplaceholder.typicode.com/posts/1",
//     "https://jsonplaceholder.typicode.com/invalid-route",
//     "https://fake-domain-xyz.com",
//   ];

//   const results = await apiClient.parallel(urls, {
//     timeout: 3000,
//     attempts: 2,
//   });

//   console.log(results);

//   console.assert(results.length === 3, "Should return 3 results");

//   const fulfilled = results.filter((r) => r.status === "fulfilled");
//   const rejected = results.filter((r) => r.status === "rejected");

//   console.assert(fulfilled.length >= 1, "Should have success");
//   console.assert(rejected.length >= 1, "Should have failure");
// }

// async function runner() {
//   await testParallelMixed();
// }

// runner();
