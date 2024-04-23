import { useState, useEffect } from "react";
import {Card, CardHeader, CardBody, Button, Input, user} from "@nextui-org/react";
import {Auth} from '../hooks/Auth'
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState()
  const [loginError, setLoginError] = useState(false)
  const navigateTo = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue)
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Trigger button click event
      document.getElementById('login').click();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "first_name") {
      setFirstName(value);
    } else if (name === "last_name") {
      setLastName(value);
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
    <div className="w-1/2 max-w-[400px] text-center flex-col items-center">
      <Card className="py-4 h-fit">

      <CardHeader className="pt-2 px-4 flex-col items-center">
        <h2 className="font-bold text-large">Sign Up</h2>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex-col gap-2">
      <Input type="first_name"  variant="bordered" label="First Name" placeholder="Enter your first name" name="first_name" value={username} onChange={handleChange}/>
      <Input type="last_name"  variant="bordered" label="Last Name" placeholder="Enter your last name" name="last_name" value={username} onChange={handleChange}/>

      <Input type="email" variant="bordered" label="Email" placeholder="Enter your email" name="username" value={username} onChange={handleChange}/>
      <Input
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        type={"password"}
        name="password"
        value={password}
        onChange={handleChange}
      />
      <Button         value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress} id="login" isDisabled={username === "" && password === "" || !username.includes("@")} isLoading={isLoading} color='primary' onClick={async () => {
        login()
        }}>
          Sign Up
      </Button>
      </CardBody>
    </Card>
      {loginError && message ? <p className="py-4 text-red-600">{message}</p> : <p className="py-4">{message}</p>}
      
    </div>


    </div>

  )
}

export default SignUp