/* eslint-disable no-unused-vars */
import { API_URL } from './constants';

// CUSTOM FUNCTIONS
// TODO: When login/registration is implemented, update id here
async function getUserInterviews() {
  const res = await get('id/UserInterview/1/interviews');
  return res.$values;
}

async function deleteUserInterview(id) {
  const res = await del(`id/UserInterview/${id}`);
  return res;
}

// CRUD FUNCTIONS
async function post(endpoint, data, auth = false) {
  return await request('POST', endpoint, data, auth);
}

async function get(endpoint, auth = false) {
  return await request('GET', endpoint, null, auth);
}

async function patch(endpoint, data, auth = false) {
  return await request('PATCH', endpoint, data, auth);
}

async function del(endpoint, auth = false) {
  return await request('DELETE', endpoint, null, auth);
}

async function request(method, endpoint, data, auth = false) {
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
    // Add authorization header if needed
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export { getUserInterviews, deleteUserInterview };
