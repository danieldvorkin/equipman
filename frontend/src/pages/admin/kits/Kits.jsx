import { Button, Flex, Grid, GridItem, Input } from "@chakra-ui/react";
import React from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import KitCard from "./kitCard";

const Kits = () => {
  const { kits } = useLoaderData();

  return (
    <div style={{ marginTop: 20 }}>
      <Flex direction="column">
        <Flex justify="space-between" align="center">
          <h1>Kits</h1>
          <Link to="/admin/kits/new">
            <Button colorScheme="teal" variant="solid">
              Create Kit
            </Button>
          </Link>
        </Flex>
        <Flex mt={4} mb={4}>
          <Input placeholder="Search kits..." />
        </Flex>
      </Flex>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={kits}>
          {(resolvedKits) => 
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {resolvedKits.map((kit) => (
                <GridItem key={kit.id} colSpan={1}>
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