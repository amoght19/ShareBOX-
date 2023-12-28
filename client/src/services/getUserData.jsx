import axios from "axios";

export const getUserData = async () => {
  const API_URL = "http://localhost:8000";
  try {
    const userToken = JSON.parse(localStorage.getItem("login")).token;
    const token = "Bearer " + userToken;
    let response = await axios.post(
      `${API_URL}/files/user`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data;
  } catch (err) {}
};
