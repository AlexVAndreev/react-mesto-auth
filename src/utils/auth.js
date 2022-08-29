export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
  })
  .then(response => checkResult(response))
}

// export const authorize = (email, password) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   })
//     .then((response) => checkResult(response))
//     .then((data) => {
//       if (data.token) {
//         localStorage.setItem("jwt", data.token);
//         return data.token;
//       }
//     })
// };

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
  })
  .then((response => checkResult(response)))
  .then((data) => {
      console.log(data)
      if(data.token){
          console.log(data.token);
          localStorage.setItem('jwt', data.token);
          return data.token;
      }
  })
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => checkResult(response))
    .then((data) => data).catch((err) => console.log(err));
};

function checkResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
