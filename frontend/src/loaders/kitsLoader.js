import { defer, redirect } from "react-router-dom";
import client from "../ApolloClient";
import { gql } from "@apollo/client";

export const GET_KITS = gql`
  query AllKits($filter: KitFilter) {
    kits(filter: $filter) {
      id
      name
      description
      version
      active
      kitItems {
        id
        item {
          id
          name
        }
      }
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

  const url = new URL(request.url);
  const name = url.searchParams.get("name") || "";
  
  const kits = client.query({
    query: GET_KITS,
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        name: name || ""
      }
    },
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