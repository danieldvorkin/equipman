import React from "react";
import { Button, Input, Spinner } from "@chakra-ui/react";
import { Form, useNavigation } from "react-router-dom";
import { CustomCard } from "../styles.js";

const Register = () => {
  const navigation = useNavigation();

  if(navigation.state === "loading") {
    return (
      <CustomCard maxW="sm">        
        <div style={{ textAlign: "center" }}>
          <p>Creating your account...</p>
          <Spinner />
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard maxW="sm">
      <h1>Register</h1>
      
      <Form method="post">
        <Input name="email" placeholder="Email" size="md" type="email" mb={4} />
        <Input name="password" placeholder="Password" size="md" type="password" mb={4} />
        <Button type="submit" width="100%">Sign Up</Button>
      </Form>

    </CustomCard>
  );
}

export default Register;