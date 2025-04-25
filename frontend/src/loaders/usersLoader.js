import { defer } from "react-router-dom";
import client from "../ApolloClient";
import { gql } from "@apollo/client";

const USERS_QUERY = gql`
  query users($page: Int, $perPage: Int, $filter: UserFilter) {
    users(page: $page, perPage: $perPage, filter: $filter) {
      edges {
        node{
          id
          email
          isAdmin
        }
      }
    }
  }
`;

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const pageSize = url.searchParams.get("pageSize") || 10;
  const role = url.searchParams.get("role");
  const email = url.searchParams.get("email");

  let users = client.query({
    query: USERS_QUERY,
    variables: { 
      page: page ? parseInt(page) : 1, 
      perPage: pageSize ? parseInt(pageSize) : 10,
      filter: {
        role: role ? role : null,
        email: email ? email : null,
      }
    },
  }).then((response) => {
    if (response.data.users.edges.length > 0) {
      return response.data.users;
    } else {
      console.error("No users found");

      return {
        edges: [],
      };
    }
  }
  ).catch((error) => {
    console.error("Error fetching users data:", error);
  });

  return defer({ users });
};