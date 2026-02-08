const searchInput = document.getElementById("search-input");
const tListContainer = document.getElementById("task-list");
const memoizedSearch = memoize(search);
const debouncedSearchHandler = debounce(handleSearch);

async function handleSearch(query) {
  if (!query.trim()) {
    clearTaskList();
    return;
  }

  const data = await memoizedSearch(query);

  clearTaskList();

  data.items.forEach((item) => {
    tListContainer.append(createTaskItem(item));
  });
}

function debounce(fn, delay = 1000) {
  let timer;

  return function (...args) {
    return new Promise(function (resolve, reject) {
      clearTimeout(timer);

      timer = setTimeout(async () => {
        try {
          const data = await fn.apply(this, args);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      }, delay);
    });
  };
}

function memoize(fn) {
  const cache = {};

  return async function (...args) {
    const key = JSON.stringify(args);
    return key in cache
      ? cache[key]
      : (cache[key] = await fn.apply(this, args));
  };
}

function clearTaskList() {
  tListContainer.innerHTML = "";
}

function createTaskItem(itemObj) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.dataset.userId = itemObj.id;

  const divImgContainer = document.createElement("div");
  divImgContainer.classList.add("img-container");

  const pfpImg = document.createElement("img");
  pfpImg.src = itemObj.avatar_url;
  pfpImg.classList.add("pfp-img");

  divImgContainer.append(pfpImg);

  const divInfoContainer = document.createElement("div");
  divInfoContainer.classList.add("info-container");

  const hrefToProfile = document.createElement("a");
  hrefToProfile.href = itemObj.html_url;

  const userName = document.createElement("p");
  userName.textContent = itemObj.login;

  hrefToProfile.append(userName);
  divInfoContainer.append(hrefToProfile);

  li.append(divImgContainer);
  li.append(divInfoContainer);

  return li;
}

searchInput.addEventListener("input", (e) => {
  debouncedSearchHandler(e.target.value);
});

async function search(username) {
  let cache = {};
  let data;
  if (username) {
    let response = await fetch(
      `https://api.github.com/search/users?q=${username}`
    );
    console.log("Github API was called.");
    data = await response.json();
  }
  return data;
}
