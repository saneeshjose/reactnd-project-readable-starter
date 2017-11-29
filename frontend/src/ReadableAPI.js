
const api = "http://localhost:3001"


// Authorization token to identify the user data
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json());


export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json());

export const getPostsByCategory = (name) =>
  fetch(`${api}/${name}/posts`, { headers })
    .then(res => res.json());