import React, { useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react"
import { 
  Dataview, 
  FilterCol, 
  SectionTitle 
} from "../../styles";
import Filters from "./filters";
import Results from "./results";
import { Await, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

const Users = () => {
  const { users } = useLoaderData();
  const [searchParams] = useSearchParams();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());

    const updatedParams = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page,
      pageSize: currentParams.pageSize || 10,
    });
    navigate({ search: updatedParams.toString() }, { replace: true });
  }, [page]);

  const isDesktop = screenWidth > 768;

  const renderFilters = () => (
    <FilterCol isMobile={!isDesktop}>
      <SectionTitle>Filters</SectionTitle>
      <Filters />
    </FilterCol>
  );

  const renderUsers = () => (
    <Dataview>
      <SectionTitle>Users</SectionTitle>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={users}>
          {(resolvedUsers) => {
            return (
              <>
                {resolvedUsers.edges.length === 0 ? (
                  <div>No users found</div>
                ) : (
                  <>
                    <Results users={resolvedUsers.edges.map((edge) => edge.node)} />
                    <div>
                      <Button 
                        onClick={() => setPage((prev) => prev - 1)} 
                        disabled={page === 1}
                        >
                          Previous
                      </Button>
                      <Button 
                        onClick={() => setPage((prev) => prev + 1)} 
                        disabled={resolvedUsers.edges.length < 10}
                        >
                          Next
                      </Button>
                    </div>
                  </>
                )}
              </>
              )
            }
          }
        </Await>
      </React.Suspense>
    
    </Dataview>
  );

  const renderContent = () => {
    if (isDesktop) {
      return (
        <Flex paddingTop="20px">
          {renderFilters()}
          {renderUsers()}
        </Flex>
      );
    }

    return (
      <>
        <Flex paddingTop="20px" direction="column">
          {renderFilters()}
        </Flex>
        <Flex direction="column">
          {renderUsers()}
        </Flex>
      </>
    );
  };

  return (
    <Flex direction="column">
      {renderContent()}
    </Flex>
  );
}

export default Users;