import React from "react";
import { Button, Input, Spinner, Text } from "@chakra-ui/react";
import { Form, useNavigation } from "react-router-dom";
import { CustomCard } from "../styles.js";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  text-align: center;
`;

const Login = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isSubmitting = navigation.state === "submitting";

  if(isSubmitting) {
    return (
      <CustomCard maxW="sm">
        <LoadingWrapper>
          <Text>Logging in...</Text>
          <Spinner />
        </LoadingWrapper>
      </CustomCard>
    );
  }

  if(isLoading) {
    return (
      <CustomCard maxW="sm">
        <LoadingWrapper>
          <Text>Loading...</Text>
          <Spinner />
        </LoadingWrapper>
      </CustomCard>
    );
  }

  return (
    <CustomCard maxW="sm">
      <h1>Login</h1>
      
      {!isLoading && (
        <Form method="post">
          <Input name="email" placeholder="Email" size="md" type="email" mb={4} />
          <Input name="password" placeholder="Password" size="md" type="password" mb={4} />
          <Button type="submit" width="100%">Login</Button>
        </Form>
      )}

    </CustomCard>
  )
};

export default Login;