const signal = AbortSignal.timeout(3000);
async function apiClient(url, attempts) {
  try {
    console.log(`Attempting fetch: attempts left = ${attempts}`);

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
    // if (
    //   err &&
    //   typeof err === "object" &&
    //   err.message &&
    //   typeof err.message === "string" &&
    //   typeof err.status === "number"
    // ) {
    //   throw err;
    // }

    if (err.name === "AbortError" || err.name === "TimeoutError") {
      throw {
        name: err.name,
        message: "Request took too long.",
        status: err.status || 0,
      };
    }

    if (err.fatal || attempts <= 0) {
      throw {
        name: err.name || "NetworkError",
        message: err.message || "Failed after retries",
        status: err.status || 0,
      };
    }

    console.log("Failed to fetch resource. Retrying....");
    return apiClient(url, attempts - 1);
  }
}

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

main("https://fake-domain-2398.com/whatever", 3)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
