import { useState, useEffect, SetStateAction } from "react";
import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react";
import { UserLogin } from "../hooks/Auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
interface LoginProps {
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigateTo = useNavigate();

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      // Trigger button click event
      document.getElementById("login")!.click();
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setMessage("");
  };

  const login = async () => {
    setIsLoading(true);
    try {
      const response = await UserLogin(username, password);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error: any) {
      console.log(error.response.data.error);
      setMessage(error.response.data.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="h-[90vh] flex items-center justify-center w-[300px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full text-center flex-col items-center"
      >
        <Card className="py-4 h-fit ">
          <CardHeader className="pt-2 px-4 flex-col items-center">
            <h2 className="font-bold text-large">Login</h2>
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex-col gap-2">
            <Input
              type="email"
              variant="bordered"
              label="Email"
              placeholder="Enter your email"
              name="username"
              value={username}
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
              id="login"
              isDisabled={
                username === "" || password === "" || !username.includes("@")
              }
              isLoading={isLoading}
              color="primary"
              onClick={() => {
                login();
              }}
            >
              Login
            </Button>
          </CardBody>
        </Card>
        {message ? (
          <p className="py-4 text-red-600">{message}</p>
        ) : (
          <p className="py-4">{message}</p>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
