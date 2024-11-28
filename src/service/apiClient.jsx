/* eslint-disable no-unused-vars */
import { API_URL } from './constants';

// CUSTOM FUNCTIONS
async function getUserInterviewsByUserIdAsync(id) {
  const res = await get(`id/UserInterview/${id}/interviews`);
// TODO: When login/registration is implemented, update id here
}

async function getinterviewNotesAsync(userInterviewId){
  const res = await get(`api/Note/InterviewNotes/${userInterviewId}`);
  return res;
}

async function getNoteByIdAsync(noteId){
  const res = await get(`api/Note/Note/${noteId}`);
  return res;
}

async function addInterviewNoteAsync(userInterviewId, data){ 
  const res = await post(`api/Note/Note/${userInterviewId}`, data);
  return res;
}

async function deleteNoteByIdAsync(noteId){
  const res = await del(`api/Note/${noteId}`);
  return res;
}

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
  const res = await post('id/UserInterview/create-interview', data);
  return res.interview;
}

async function resetPasswordAsync(data) {
  const res = await post('api/User/resetPassword', data);
  return res;
}

async function updateUserInterviewStatusAsync(interviewId, status) {
  const res = await put(`id/UserInterview/changeStatus/${interviewId}`, status);
  return res.interview;
}

async function registerUserAsync(data) {
  const res = await post('api/User/Register', data);
  return res;
}

async function loginUserAsync(data) {
  const res = await post('api/User/login', data);
  return res;
}

async function getUserByIdAsync(id) {
  const res = await get(`api/User/${id}`);
  return res;
}

// FIXME: Implement updateUserByIdAsync backend
async function updateUserByIdAsync(id, data) {
  const res = await put(`api/User/${id}`, data);
  return res;
}

async function getLogbookByIdAsync(id) {
  const res = await get(`api/Logbook/${id}`);
  return res;
}

async function updateLogByIdAsync(id, data) {
  const res = await put(`api/Log/${id}`, data);
  return res;
}

async function createLogAsync(interviewId, logbookId, data) {
  const res = await post(`api/Log/${interviewId}/${logbookId}`, data);
  return res;
}

async function forgotPasswordAsync(email) {
  const res = await post('api/User/forgotPassword', email);
  return res;
}

async function deleteLogByIdAsync(id) {
  const res = await del(`api/Log/${id}`);
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

  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}, response:`, response);
    throw new Error(response.message || response || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/*
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
    console.error(`HTTP error! status: ${response.status}, response:`, responseData);
    throw new Error(
      responseData.message || responseData || `HTTP error! status: ${response.status}`
    );
  }

  return responseData;
}
*/

export {
  getUserInterviewsByUserIdAsync,
  deleteUserInterviewAsync,
  updateUserInterviewAsync,
  createUserInterviewAsync,
  updateUserInterviewStatusAsync,
  forgotPasswordAsync,
  resetPasswordAsync,
  registerUserAsync,
  loginUserAsync,
  getUserByIdAsync,
  getLogbookByIdAsync,
  updateLogByIdAsync,
  createLogAsync,
  deleteLogByIdAsync,
  getinterviewNotesAsync,
  getNoteByIdAsync,
  addInterviewNoteAsync,
  deleteNoteByIdAsync
};
