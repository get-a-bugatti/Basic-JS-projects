// Final set of tests that u can use to test index.js (final product).

async function testParallelMixed() {
  const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/invalid-route",
    "https://fake-domain-xyz.com",
  ];

  const results = await apiClient.parallel(urls, {
    timeout: 3000,
    attempts: 2,
  });

  console.log(results);

  console.assert(results.length === 3);

  const fulfilled = results.filter((r) => r.status === "fulfilled");
  const rejected = results.filter((r) => r.status === "rejected");

  console.assert(fulfilled.length >= 1);
  console.assert(rejected.length >= 1);
}

async function testParallelAllSuccess() {
  const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
  ];

  const results = await apiClient.parallel(urls, {
    timeout: 3000,
    attempts: 2,
  });

  console.log(results);

  console.assert(results.every((r) => r.status === "fulfilled"));
}

async function testParallelAllFail() {
  const urls = ["https://fake-domain-a.com", "https://fake-domain-b.com"];

  const results = await apiClient.parallel(urls, {
    timeout: 2000,
    attempts: 1,
  });

  console.log(results);

  console.assert(results.every((r) => r.status === "rejected"));
}

async function testFastestSuccess() {
  const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://fake-domain-xyz.com",
  ];

  const result = await apiClient.fastest(urls, {
    timeout: 3000,
    attempts: 2,
  });

  console.log(result);

  console.assert(result.id === 1);
}

async function testFastestFallback() {
  const urls = [
    "https://fake-domain-xyz.com",
    "https://jsonplaceholder.typicode.com/posts/2",
  ];

  const result = await apiClient.fastest(urls, {
    timeout: 3000,
    attempts: 2,
  });

  console.log(result);

  console.assert(result.id === 2);
}

async function testFastestAllFail() {
  const urls = ["https://fake-domain-a.com", "https://fake-domain-b.com"];

  try {
    await apiClient.fastest(urls, {
      timeout: 2000,
      attempts: 1,
    });

    console.assert(false);
  } catch (err) {
    console.log(err);
  }
}

async function runAllTests() {
  await testParallelMixed();
  await testParallelAllSuccess();
  await testParallelAllFail();

  await testFastestSuccess();
  await testFastestFallback();
  await testFastestAllFail();
}

runAllTests();
