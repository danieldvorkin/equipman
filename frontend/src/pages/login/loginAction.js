import { redirect } from "react-router-dom";
import { gql } from "@apollo/client";
import client from "../../ApolloClient.js";

const LOGIN_MUTATION = gql`
  mutation signIn($input: SignInUserInput!){
    signInUser(input: $input){
      user {
        id
        email
      }
      token
      errors
    }
  }
`;

export async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { input: { email, password } },
    });

    const token = data.signInUser.token;

    if (token) {
      localStorage.setItem("token", token);

      return redirect("/");
    }
  } catch (error) {
    console.error("Login error:", error);
  
    // You can throw a redirect to an error page, or return an error object
    return null;
  }

  return null;
}
