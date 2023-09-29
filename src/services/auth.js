import axios from "axios";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post("/api/auth/login", credentials);
    return response.data.token;
  } catch (error) {
    throw error;
  }
};
