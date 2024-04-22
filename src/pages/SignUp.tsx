import {Card, CardHeader, CardBody, Button, Input} from "@nextui-org/react";

const Login = () => {
  return (
    <Card className="py-4">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
      <h2 className="font-bold text-large">Sign Up</h2>
    </CardHeader>
    <CardBody className="overflow-visible py-2">
    <Input type="email" label="Email" placeholder="Enter your email" />
    <Input
      label="Password"
      variant="bordered"
      placeholder="Enter your password"
      type={"password"}
    />
    <Button color='primary'>
        Sign Up
    </Button>
    </CardBody>
  </Card>
  )
}

export default Login