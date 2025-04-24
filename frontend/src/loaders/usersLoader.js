import { defer } from "react-router-dom";
import client from "../ApolloClient";
import { gql } from "@apollo/client";

const USERS_QUERY = gql`
  query AllUsers {
    users {
      id
      email
      isAdmin
    }
  }
`;

export async function loader({ request }) {
  const users = client.query({
    query: USERS_QUERY,
  }).then((response) => {
    if (response.data.users) {
      return response.data.users;
    } else {
      throw new Response("Users not found", { status: 404 });
    }
  }
  ).catch((error) => {
    console.error("Error fetching users data:", error);
    throw new Response("Users not found", { status: 404 });
  });

  return defer({ users });
};