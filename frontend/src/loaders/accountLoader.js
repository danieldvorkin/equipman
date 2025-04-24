import { defer, redirect } from "react-router-dom";
import client from "../ApolloClient";
import { gql } from "@apollo/client";

const CURRENT_USER_QUERY = gql`
  query currentUser {
    me {
      id
      isAdmin
      email
    }
  }
`;

export async function loader({ request }) {
  const account = client.query({
    query: CURRENT_USER_QUERY,
  }).then((response) => {
    if (response.data.me) {
      return response.data.me;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  }).catch((error) => {
    console.error("Error fetching user data:", error);
    throw new Response("User not found", { status: 404 });
  });

  return defer({
    account
  });
}