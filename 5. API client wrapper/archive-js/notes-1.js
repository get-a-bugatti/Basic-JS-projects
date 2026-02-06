async function apiClient(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

//   async function main() {
//     let url = "https://api.github.com/users/octocat";
//     console.log(await apiClient(url));
//   }

//   main();

// Instead of doing like above, we can also resolve the Promise returned by apiClient async function using .then().catch().

let url = "https://api.github.com/users/octocat";
apiClient(url)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
