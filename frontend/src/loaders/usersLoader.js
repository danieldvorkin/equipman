import { defer } from "react-router-dom";
import client from "../ApolloClient";
import { gql } from "@apollo/client";

const USERS_QUERY = gql`
  query users($page: Int, $perPage: Int) {
    users(page: $page, perPage: $perPage) {
      edges {
        node{
          id
          email
        }
      }
    }
  }
`;

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const pageSize = url.searchParams.get("pageSize") || 10;

  let users = client.query({
    query: USERS_QUERY,
    variables: { 
      page: page ? parseInt(page) : 1, 
      perPage: pageSize ? parseInt(pageSize) : 10 
    },
  }).then((response) => {
    if (response.data.users.edges.length > 0) {
      return response.data.users;
    } else {
      throw new Response("Users not found", { status: 404 });
    }
  }
  ).catch((error) => {
    console.error("Error fetching users data:", error);
    throw new Response("Users not found", { status: 404 });
  });

  const role = url.searchParams.get("role");
  if (role) {
    users = users.then((usersData) => {
      return usersData.users.filter((user) => user.isAdmin === (role === "admin"));
    });
  }

  return defer({ users });
};