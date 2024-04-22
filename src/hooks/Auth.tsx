// import Cookies from "js-cookie";

export async function Auth(username: string, password: string) {
    const request = {
        username: username,
        password: password,
      };
      try {
        const response = await fetch(
          import.meta.env.VITE_REACT_APP_API_BASE_URL + "/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": import.meta.env.VITE_REACT_API_API_KEY
            },
            body: JSON.stringify(request),
            cache: "default",
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error)
      } finally {
      }
}