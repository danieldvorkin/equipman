import { Button, Flex, Grid, GridItem, Input, InputGroup } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Await, Link, useLoaderData, useSearchParams } from "react-router-dom";
import KitCard from "./kitCard";
import { getEndElement } from "../../util";

const Kits = () => {
  const { kits } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = React.useState(searchParams.get('name') || '');
  const inputRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("name", search);
      setSearchParams(params);
    }, 200);
  
    return () => clearTimeout(timeout);
  }, [search, setSearchParams]);

  return (
    <div style={{ marginTop: 20 }}>
      <Flex direction="column">
        <Flex justify="space-between" align="center" wrap="wrap">
          <h1>Kits</h1>
          <Link to="/admin/kits/new">
            <Button colorScheme="teal" variant="solid" mt={{ base: 2, md: 0 }}>
              Create Kit
            </Button>
          </Link>
        </Flex>
        <Flex mt={4} mb={4}>
          <InputGroup endElement={getEndElement(search, setSearch, inputRef)}>
            <Input 
              placeholder="Search kits..." 
              value={search}
              ref={inputRef}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Flex>
      </Flex>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={kits}>
          {(resolvedKits) => 
            <Grid 
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} 
              gap={4}
            >
              {resolvedKits.map((kit) => (
                <GridItem key={kit.id} colSpan={1} style={{ display: "flex" }}>
                  <KitCard 
                    kit={kit} 
                  />
                </GridItem>
              ))}
            </Grid>
          }
        </Await>
      </React.Suspense>
    </div>
  );
}

export default Kits;