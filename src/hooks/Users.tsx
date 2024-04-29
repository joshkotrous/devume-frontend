import axios from "axios";

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
