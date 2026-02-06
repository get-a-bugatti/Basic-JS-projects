// These were the tests used to check if errors were standardized into one format or not.

async function test404() {
  let threw = false;

  try {
    await apiClient("https://jsonplaceholder.typicode.com/invalid-route");
  } catch (err) {
    threw = true;
    validateErrorShape(err);
    console.assert(err.status === 404, "Status should be 404");
  }

  console.assert(threw, "Expected test404 to throw error");
}

async function testNetworkFailure() {
  try {
    await apiClient("https://fake-domain-12345.com");
  } catch (err) {
    console.log("Test Network Failure:");

    console.assert(typeof err === "object", "Error should be object");
    console.assert("message" in err, "Missing message");
    console.assert("status" in err, "Missing status");

    console.log(err);
  }
}

async function testInvalidURL() {
  try {
    await apiClient("ht!tp://broken-url");
  } catch (err) {
    console.log("Test Invalid URL:");

    console.assert(typeof err === "object", "Error should be object");
    console.assert("message" in err, "Missing message");
    console.assert("status" in err, "Missing status");

    console.log(err);
  }
}

function validateErrorShape(err) {
  if (
    err === null ||
    typeof err !== "object" ||
    typeof err.message !== "string" ||
    typeof err.status !== "number"
  ) {
    throw new Error("❌ Error shape is inconsistent");
  }

  console.log("✅ Error shape valid:", err);
}

async function runSafe(testFn) {
  try {
    await testFn();
  } catch (err) {
    console.error("Test crashed : ", err);
  }
}

async function runTests() {
  await runSafe(test404);
  await runSafe(testNetworkFailure);
  await runSafe(testInvalidURL);
}

runTests();
