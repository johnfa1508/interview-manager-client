/*
export const saveUserToLocalStorage = (user) => {
  localStorage.setItem('loggedInUser', JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null; // Return user data if exists, else return null
};
*/

export const updateUserInLocalStorage = (updatedFields) => {
  const existingUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};

  // Update only the fields that are sent
  const updatedUser = { ...existingUser, ...updatedFields };

  localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
};

/*
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('loggedInUser');
};
*/
