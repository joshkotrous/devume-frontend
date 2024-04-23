import { useState, useEffect } from "react";
import {Card, CardHeader, CardBody, Button, Input, user} from "@nextui-org/react";
import {Auth} from '../hooks/Auth'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState()
  const [loginError, setLoginError] = useState(false)
  const navigateTo = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setMessage("")
  };

  const login = async () => {
    setIsLoading(true) 
    const response = await Auth(username, password)
    setMessage(response.message)
    setLoginError(response.error)
    setIsLoading(false)
    if (response.error === false) {
      navigateTo("/");

    }
  }

  return (
    <div className="h-[90vh] flex items-center justify-center">
    <div className="w-1/2 text-center flex-col items-center">
      <Card className="py-4 h-fit">
      <CardHeader className="pt-2 px-4 flex-col items-center">
        <h2 className="font-bold text-large">Login</h2>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex-col gap-2">
      <Input type="email" label="Email" placeholder="Enter your email" name="username" value={username} onChange={handleChange}/>
      <Input
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        type={"password"}
        name="password"
        value={password}
        onChange={handleChange}
      />
      <Button isDisabled={username === "" && password === "" || !username.includes("@")} isLoading={isLoading} color='primary' onClick={async () => {
        login()
        }}>
          Login
      </Button>
      </CardBody>
    </Card>
      {loginError && message ? <p className="py-4 text-red-600">{message}</p> : <p className="py-4">{message}</p>}
      
    </div>


    </div>

  )
}

export default Login