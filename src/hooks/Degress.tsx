import axios from "axios";

export async function GetDegrees() {
  const headers = {
    "Content-Type": "application/json",
    "X-Api-Key": import.meta.env.VITE_REACT_API_API_KEY,
  };
  try {
    const response = await axios.get(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + "/degrees",
      { headers: headers }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response);
    }
    throw error;
  }
}
