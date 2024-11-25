export const saveUserToLocalStorage = (user) => {
  localStorage.setItem('loggedInUser', JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null; // Return user data if exists, else return null
};

export const updateUserInLocalStorage = (updatedUser) => {
  localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('loggedInUser');
};
