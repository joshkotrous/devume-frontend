import axios from "axios";
import Cookies from "js-cookie";
import { GetProfile } from "./Profiles";

export async function UserLogin(username: string, password: string) {
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
    let profile;
    try {
      profile = await GetProfile(response.data.user_id);
      console.log(profile);
      localStorage.setItem("profileId", profile.uuid);
    } catch (error) {
      console.log(error);
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Error data:", error.response.data);
    }
    throw error;
  }
}

export async function SignOut() {
  Cookies.remove("token");
  localStorage.removeItem("profileId");
}
