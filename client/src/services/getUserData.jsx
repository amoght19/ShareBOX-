import axios from "axios";

export const getUserData = async () => {
  const API_URL = "https://sharebox-9lqk.onrender.com";
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
