import React from "react";
import { Await, useLoaderData } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import { Spinner } from "@chakra-ui/react";
import styled from "styled-components";
import AdminNavbar from "./components/adminNavbar";

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AdminLayout = () => {
  const { adminLayout } = useLoaderData();

  return (
    <React.Suspense fallback={<SpinnerContainer><Spinner /></SpinnerContainer>}>
      <Await resolve={adminLayout}>
        {({ resolvedAdminLayout }) => (
          <>
            <AdminNavbar />

            <Container>
              <Outlet />
            </Container>
          </>
        )}
      </Await>
    </React.Suspense>
  )
}

export default AdminLayout;