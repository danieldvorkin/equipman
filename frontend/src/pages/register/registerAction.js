import { redirect } from "react-router-dom";
import { gql } from "@apollo/client";
import client from "../../ApolloClient.js";

const REGISTER_MUTATION = gql`
  mutation signUp($input: SignUpUserInput!){
    signUpUser(input:$input){
      user {
        id
        email
      }
      errors
    }
  }
`;

export async function registerAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data } = await client.mutate({
      mutation: REGISTER_MUTATION,
      variables: { input: { email, password } },
    });

    const errors = data.signUpUser.errors;

    if (!errors || errors.length === 0) {
      return redirect("/login");
    }
  } catch (error) {
    console.error("Registration error:", error);
  
    // You can throw a redirect to an error page, or return an error object
    return null;
  }

  return null;
}
