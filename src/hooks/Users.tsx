import axios from "axios";
import Cookies from "js-cookie";
export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password?: string;
}

export async function CreateUser(
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string
) {
  const headers = {
    "Content-Type": "application/json", // Example header
    "X-Api-key": import.meta.env.VITE_REACT_API_API_KEY, // Example header
  };

  const request = {
    username: username,
    password: password,
    first_name: firstName,
    last_name: lastName,
    email: email,
  };
  try {
    const response = await axios.post(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + "/users/create",
      request,
      {
        headers: headers,
        // withCredentials: true // Include cookies in the request
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Error data:", error.response.data);
    }
    throw error;
  }
}

export async function UpdateUser(userData: UserData, userId: number) {
  const request = userData;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + Cookies.get("token"),
  };
  try {
    const response = await axios.put(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + `/users/${userId}/update`,
      request,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
    }
    throw error;
  }
}
