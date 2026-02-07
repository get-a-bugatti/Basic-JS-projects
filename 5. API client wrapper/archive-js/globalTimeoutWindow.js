// making a variation of apiClient wrapper
// one that uses the global timeout window strategy
// i.e., (a fixed window time, and within it all or any reattempts for fetch must be made.)

async function apiClient(url, { timeout, attempts }) {
  const signal = AbortSignal.timeout(timeout);

  async function internalRetry(tryCount) {
    console.log(`Attempts remaining : ${tryCount}`);

    try {
      const response = await fetch(url, { signal });

      if (!response.ok) {
        let name = "HTTPError";
        let errMessage;
        if (response.status >= 400 && response.status < 500) {
          errMessage = `Client Error : ${response.status}`;
        } else if (response.status > 500) {
          errMessage = `Server Error : ${response.status}`;
        }

        throw {
          name,
          message: errMessage,
          status: response.status,
        };
      }
      const data = await response.json();
      return data;
    } catch (err) {
      if (err.name === "AbortError" || err.name === "TimeoutError") {
        throw {
          name: "AbortError",
          message:
            "Timeout occurred. Request took too long (even with retries).",
          status: err.status || 0,
        };
      }
      // throw err;
      if (
        err &&
        typeof err === "object" &&
        typeof err.message === "string" &&
        typeof err.name === "string" &&
        typeof err.status === "number"
      ) {
        throw err;
      }

      if (tryCount <= 0) {
        throw {
          name: "MaxAttemptsReached",
          message: "Network error. failed to fetch.",
          status: 0,
        };
      }

      const delayDuration = (attempts - tryCount) * 5000;
      const delayFn = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, delayDuration);
      });
      console.log(
        `Fetch probably failed. Waiting for ${delayDuration}ms to try again.`
      );
      await delayFn;
      console.log("Retrying....");

      return internalRetry(tryCount - 1);
    }
  }

  return internalRetry(attempts);
}

async function main(targetUrl) {
  const data = await apiClient(targetUrl, {
    timeout: 3000,
    attempts: 3,
  });
  return data;
}

// NORMAL CASE
// main("https://api.github.com/users/get-a-bugatti")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err));

// TEST FOR Timeout case :
// --- TEST CASE: Global Timeout Trigger ---
// This URL will wait 5 seconds before responding.
// Since your global signal is 3000ms, it should trigger "Request took too long"
// and stop immediately without retrying.

console.log("--- Starting Global Timeout Test (Expected: AbortError) ---");

// main("https://httpbin.org/delay/5", 3)
//   .then((data) => {
//     console.log("Success:", data);
//   })
//   .catch((err) => {
//     console.log("Caught Expected Error:", err);
//     if (err.name === "AbortError") {
//       console.log("✅ TEST PASSED: Global timeout triggered correctly.");
//     } else {
//       console.log("❌ TEST FAILED: Expected AbortError but got", err.name);
//     }
//   });

main("https://fake-domain-123.com/whatever")
  .then((data) => {
    console.log("success:", data);
  })
  .catch((err) => console.log(err));
