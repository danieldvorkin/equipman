import { gql } from "@apollo/client";
import client from "../../../../ApolloClient";
import { redirect } from "react-router-dom";

const UPSERT_KIT_MUTATION = gql`
  mutation addKit($input: UpsertKitInput!){
    upsertKit(input: $input){
      kit {
        id
        name
        description
        version
        active
        createdBy {
          id
          email
          isAdmin
        }
      }
      errors
    }
  }
`;

export async function addKitAction({ request }) {
  const formData = await request.formData();
  const { name, description, version, active, createdById } = Object.fromEntries(formData);
  const isActive = active === "on";

  const { data } = await client.mutate({
    mutation: UPSERT_KIT_MUTATION,
    variables: { input: { name, description, version, active: isActive, createdById } },
  });

  const errors = data.upsertKit.errors;
  if (!errors || errors.length === 0) {
    return { success: true}
  } else {
    console.log(errors);
    return { success: false, errors };
  }
};