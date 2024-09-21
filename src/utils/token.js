// Function to get token from localStorage
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Function to set token in localStorage
export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

// Function to remove token from localStorage
export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export const getUserIdFromToken = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};