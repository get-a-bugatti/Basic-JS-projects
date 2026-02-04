const usersData = [
  {
    id: 1,
    name: "  Alice  ",
    status: "ACTIVE",
    last_login: "2024-12-01T10:30:00Z",
  },
  {
    id: 2,
    name: "bob",
    status: "active ",
    last_login: null,
  },
  {
    id: 3,
    name: "CHARLIE",
    status: "Active",
    last_login: "12/15/2024",
  },
  {
    id: 4,
    name: "",
    status: "  disabled",
    last_login: "2023-08-05 14:22",
  },
];

function sanitizeNames(name) {
  // removes whitespace, and keeps only alphabets.

  return name.trim().replace(/[^a-zA-Z]/g, "");
}

function normalizeUser(user) {
  const name = sanitizeNames(user.name);
  const status = user.status?.trim().toLowerCase() || "";

  return {
    ...user,
    name: name,
    status: status,
  };
}

function isActiveWithName(user) {
  return user.name && user.status === "active";
}

function getDaysSinceLastLogin(dateValue) {
  if (typeof dateValue !== "string" || dateValue.trim() === "") {
    return null;
  }

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) {
    return null;
  }

  return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

function transformUser(user) {
  return {
    fullName: user.name,
    daysSinceLastLogin: getDaysSinceLastLogin(user.last_login),
  };
}

function sortByLastLogin(a, b) {
  if (a.daysSinceLastLogin === null) return 1;
  if (b.daysSinceLastLogin === null) return -1;
  return a.daysSinceLastLogin - b.daysSinceLastLogin;
}

function dataProcessor(data) {
  let clonedData = structuredClone(data);

  return clonedData
    .map(normalizeUser)
    .filter(isActiveWithName)
    .map(transformUser)
    .sort(sortByLastLogin);
}

console.log(dataProcessor(usersData));
