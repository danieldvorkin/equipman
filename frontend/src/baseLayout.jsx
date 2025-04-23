import React from "react";
import { Await, useLoaderData } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import { Spinner } from "@chakra-ui/react";
import NavBar from "./components/navbar";
import styled from "styled-components";

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BaseLayout = () => {
  const { baseLayout } = useLoaderData();

  return (
    <React.Suspense fallback={<SpinnerContainer><Spinner /></SpinnerContainer>}>
      <Await resolve={baseLayout}>
        {({ resolvedBaseLayout }) => (
          <>
            <NavBar />

            <Container>
              <Outlet />
            </Container>
          </>
        )}
      </Await>
    </React.Suspense>
  )
}

export default BaseLayout;