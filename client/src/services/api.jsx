import axios from "axios";

export const UploadFile = async (data) => {
  const API_URL = "http://localhost:8000";
  try {
    const userToken = JSON.parse(localStorage.getItem("login")).token;
    const token = "Bearer " + userToken;
    let response = await axios.post(`${API_URL}/files/upload`, data, {
      headers: {
        authorization: token,
      },
    });
    return response.data;
  } catch (err) {}
};
