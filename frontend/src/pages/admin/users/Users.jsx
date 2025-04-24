import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react"
import { 
  Dataview, 
  FilterCol, 
  SectionTitle 
} from "../../styles";
import Filters from "./filters";

const Users = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isDesktop = screenWidth > 768;
  const isMobile = screenWidth <= 768;

  const renderFilters = () => (
    <FilterCol>
      <SectionTitle>Filters</SectionTitle>
      <Filters />
    </FilterCol>
  );

  const renderUsers = () => (
    <Dataview>
      <SectionTitle>Users</SectionTitle>
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