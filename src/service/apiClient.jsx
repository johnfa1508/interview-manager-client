import { API_URL } from './constants';

// CUSTOM FUNCTIONS

// CRUD FUNCTIONS
async function post(endpoint, data, auth = true) {
  return await request('POST', endpoint, data, auth);
}

async function get(endpoint, auth = true) {
  return await request('GET', endpoint, null, auth);
}

async function patch(endpoint, data, auth = true) {
  return await request('PATCH', endpoint, data, auth);
}

async function del(endpoint, auth = true) {
  return await request('DELETE', endpoint, null, auth);
}

async function request(method, endpoint, data, auth = true) {
  const opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method
  };

  if (method.toUpperCase() !== 'GET') {
    opts.body = JSON.stringify(data);
  }

  if (auth) {
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  return response.json();
}

export { post, get, patch, del };
