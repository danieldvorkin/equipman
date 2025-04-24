import { Card, createListCollection, Heading, Portal, Select, Spinner } from "@chakra-ui/react";
import React from "react";
import { Await, useLoaderData } from "react-router-dom";
import { SpinnerContainer } from "../../adminLayout";
import InputField from "../../components/inputField";

const Account = () => {
  const { account } = useLoaderData();
  const roles = createListCollection({
    items: [
      {value: "admin", label: "Admin"}, 
      {value: "user", label: "User"},
    ]
  });

  return (
    <React.Suspense fallback={<SpinnerContainer><Spinner /></SpinnerContainer>}>
      <Await resolve={account}>
        {(resolvedAccount) => (
          <Card.Root mx="auto" p={6}>
            <Heading size="md" mb={4}>Account</Heading>
            
            <InputField
              label="Email"
              required
              placeholder="Enter your email"
              value={resolvedAccount?.email}
              onChange={(e) => console.log(e.target.value)}
            />

          </Card.Root>
        )}
      </Await>
    </React.Suspense>
  );
}

export default Account;