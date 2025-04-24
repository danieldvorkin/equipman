import { Container } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import NavBar from "../../components/navbar";

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

const ErrorPage = () => {
  return (
    <>
      <NavBar />
      <ErrorContainer>
        <div style={{ display: "block", margin: "0 auto" }}>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>We are working to fix this issue. Please try again later.</p>
        </div>
      </ErrorContainer>
    </>
  );
}
export default ErrorPage;