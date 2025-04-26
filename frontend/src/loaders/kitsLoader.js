import { defer, redirect } from "react-router-dom";
import client from "../ApolloClient";
import { gql } from "@apollo/client";

const GET_KITS = gql`
  query {
    kits {
      id
      name
      description
      version
      active
      createdBy {
        id
        email
      }
    }
  }
`;

export async function loader({ request }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }

  const kits = client.query({
    query: GET_KITS,
  }).then((response) => {
    if (response.errors) {
      throw new Error("Failed to fetch kits");
    }
    
    return response.data.kits;
  }).catch((error) => {
    console.error("Error fetching kits:", error);
    throw new Error("Failed to fetch kits");
  });

  return defer ({
    kits
  });
}