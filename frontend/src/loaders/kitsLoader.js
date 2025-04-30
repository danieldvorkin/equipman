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
      createdBy {
        id
        email
      }
    }
  }
`;

export const GET_KIT = gql`
  query GetKit($id: ID!) {
    kits(id: $id) {
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

  return defer({
    kits
  });
}

// New loader for the kit detail page
export async function kitDetailLoader({ params }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  const kitId = params.kitId;

  if (!kitId) {
    console.error("kitId is undefined");
    throw new Error("Kit ID is required to fetch kit details");
  }
  
  const kitPromise = client.query({
    query: GET_KIT,
    variables: {
      id: kitId,
    },
    fetchPolicy: 'network-only',
  }).then((response) => {
    if (response.errors) {
      throw new Error("Failed to fetch kit details");
    }
    return response.data.kits[0];
  }).catch((error) => {
    console.error("Error fetching kit details:", error);
    throw new Error("Failed to fetch kit details");
  });

  return defer({
    kit: kitPromise
  });
}