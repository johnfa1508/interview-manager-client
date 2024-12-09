export const updateUserInLocalStorage = (updatedFields) => {
  const existingUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};

  // Update only the fields that are sent
  const updatedUser = { ...existingUser, ...updatedFields };

  localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
};