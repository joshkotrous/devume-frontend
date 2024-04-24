import Cookies from "js-cookie";
import axios from "axios";

export async function UserLogin(username, password) {
  const request = {
    username: username,
    password: password,
  };
  try {
    const response = await axios.post(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + "/token",
      request,
      {
        // withCredentials: true // Include cookies in the request
      }
    );
    console.log(response.data);
    Cookies.set("token", response.data.token);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error data:", error.response.data);
    }
    throw error;
  }
}
