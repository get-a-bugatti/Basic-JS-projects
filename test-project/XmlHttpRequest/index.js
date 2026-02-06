const requestUrl = "https://api.github.com/users/get-a-bugatti";

const xhr = new XMLHttpRequest();
console.log("UNSENT", xhr.readyState);

xhr.open("GET", requestUrl);
// console.log("OPENED", xhr.readyState);

// xhr.onprogress = () => {
//   console.log("LOADING", xhr.readyState);
//   console.log("received headers and status", xhr.status, xhr.HEADERS_RECEIVED);
// };

// xhr.onload = () => {
//   console.log("DONE", xhr.readyState);
//   console.log("responseType:", `"${xhr.responseType}"`);
// };

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    // console.log("DONE Receiving response (4).");
    // console.log("here is response : ", xhr.responseText);

    const responseJSON = JSON.parse(xhr.responseText);
    const following = responseJSON.following;

    console.log("User's following is : ", following);
  }
};

xhr.send();
