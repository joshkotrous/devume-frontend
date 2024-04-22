import { useState } from "react";
import {Card, CardHeader, CardBody, Button, Input, user} from "@nextui-org/react";
import {Auth} from '../hooks/Auth'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  return (
    <Card className="py-4">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
      <h2 className="font-bold text-large">Login</h2>
    </CardHeader>
    <CardBody className="overflow-visible py-2">
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
    <Button color='primary' onClick={() => {Auth(username, password)}}>
        Login
    </Button>
    </CardBody>
  </Card>
  )
}

export default Login