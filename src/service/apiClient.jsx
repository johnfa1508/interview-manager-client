/* eslint-disable no-unused-vars */
import { API_URL } from './constants';

// CUSTOM FUNCTIONS
// TODO: When login/registration is implemented, update id here
async function getUserInterviewsAsync() {
  const res = await get('id/UserInterview/1/interviews');
  return res.$values;
}

async function deleteUserInterviewAsync(id) {
  const res = await del(`id/UserInterview/${id}`);
  return res;
}

async function updateUserInterviewAsync(id, data) {
  const res = await put(`id/UserInterview/${id}`, data);
  return res.interview;
}

async function createUserInterviewAsync(data) {
  const res = await post('id/UserInterview', data);
  return res.interview;
}

async function registerUserAsync(data) {
  const res = await post('api/User/Register', data);
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

async function put(endpoint, data, auth = false) {
  return await request('PUT', endpoint, data, auth);
}

async function del(endpoint, auth = false) {
  return await request('DELETE', endpoint, null, auth);
}

async function request(method, endpoint, data, auth = false) {
  const opts = {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
  };

  if (method.toUpperCase() !== 'GET') {
    opts.body = JSON.stringify(data);
  }

  if (auth) {
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  // Handle the response based on the Content-Type header
  const contentType = response.headers.get('Content-Type');
  let responseData;

  if (contentType && contentType.includes('application/json')) {
    responseData = await response.json(); // Parse as JSON
  } else {
    responseData = await response.text(); // Parse as plain text
  }

  if (!response.ok) {
    console.error(
      `HTTP error! status: ${response.status}, response:`,
      responseData
    );
    throw new Error(
      responseData.message || responseData || `HTTP error! status: ${response.status}`
    );
  }

  return responseData;
}


export {
  getUserInterviewsAsync,
  deleteUserInterviewAsync,
  updateUserInterviewAsync,
  createUserInterviewAsync,
  registerUserAsync
};
