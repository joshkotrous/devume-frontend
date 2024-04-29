import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  user,
} from "@nextui-org/react";
import { CreateUser } from "../hooks/Users.tsx";
import { useNavigate } from "react-router-dom";
import { CreateProfile } from "../hooks/Profiles.tsx";
import { UserLogin } from "../hooks/Auth.tsx";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigateTo = useNavigate();

  const handleKeyPress = (event: any) => {
    if (event.keyCode === 13) {
      document.getElementById("sign-up")!.click();
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "first_name") {
      setFirstName(value);
    } else if (name === "last_name") {
      setLastName(value);
    } else if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    }
    setErrorMessage("");
  };

  const createAccount = async () => {
    setIsLoading(true);
    try {
      const response = await CreateUser(
        firstName,
        lastName,
        email,
        username,
        password
      );
      await UserLogin(username, password);
      await CreateProfile();
      navigateTo("/");
    } catch (error: any) {
      if ("username" in error.response.data) {
        console.log(error.response.data.username);
        setErrorMessage(error.response.data.username);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="w-1/2 max-w-[400px] text-center flex-col items-center">
        <Card className="py-4 h-fit">
          <CardHeader className="pt-2 px-4 flex-col items-center">
            <h2 className="font-bold text-large">Sign Up</h2>
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex-col gap-2">
            <Input
              type="first_name"
              variant="bordered"
              label="First Name"
              placeholder="Enter your first name"
              name="first_name"
              value={firstName}
              onChange={handleChange}
            />
            <Input
              type="last_name"
              variant="bordered"
              label="Last Name"
              placeholder="Enter your last name"
              name="last_name"
              value={lastName}
              onChange={handleChange}
            />
            <Input
              type="username"
              variant="bordered"
              label="Username"
              placeholder="Enter your username"
              name="username"
              value={username}
              onChange={handleChange}
            />

            <Input
              type="email"
              variant="bordered"
              label="Email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              type={"password"}
              name="password"
              value={password}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
            <Button
              className="mt-4"
              id="sign-up"
              isDisabled={
                username === "" ||
                password === "" ||
                firstName === "" ||
                lastName === "" ||
                email === "" ||
                !email.includes("@")
              }
              isLoading={isLoading}
              color="primary"
              onClick={() => {
                createAccount();
              }}
            >
              Sign Up
            </Button>
          </CardBody>
        </Card>
        {errorMessage ? (
          <p className="py-4 text-red-600">{errorMessage}</p>
        ) : (
          <p className="py-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
