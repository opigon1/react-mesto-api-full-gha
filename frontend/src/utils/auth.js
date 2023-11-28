// const BASE_URL = "https://api.project.mesto.nomoredomainsmonster.ru";
const BASE_URL = "http://localhost:3000";
function handleCheckResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

function register({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => handleCheckResponse(res));
}

function authorize({ email, password }) {
  const url = `${BASE_URL}/signin`;
  return fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => handleCheckResponse(res));
}

function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => handleCheckResponse(res));
}

export { register, authorize, checkToken };
