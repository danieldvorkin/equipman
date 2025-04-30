import React from "react";
import { Await, Link, useLoaderData, useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Card,
  CloseButton,
  Collapsible,
  Dialog,
  Flex,
  Heading,
  HStack,
  Image,
  Portal
} from "@chakra-ui/react";
import AddNewKitItem from "./addNewKitItem";
import AccordianCard from "./AccordianCard";

const KitShow = () => {
  const { kitId } = useParams();
  const { kit } = useLoaderData();

  return (
    <Dialog.Root style={{ marginTop: 20 }}>
      <Flex direction="column">
        <Flex justify="space-between" align="center" wrap="wrap">
          <span></span>
          <Dialog.Trigger asChild>
            <Button 
              colorScheme="teal" 
              variant="solid" 
              mt={{ base: 2, md: 0 }}
              >
              Add Kit Item
            </Button>
          </Dialog.Trigger>
        </Flex>
      </Flex>

      <AddNewKitItem />

      <hr/>

      <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={kit}>
          {(resolvedKit) => (
            <>
              <AccordianCard 
                resolvedKit={resolvedKit} 
                cardTitle={"Kit Details"}
                detailsCard={true}
              />

              {resolvedKit.kitItems?.map((item) => (
                <AccordianCard 
                  key={item.id} 
                  resolvedKit={item} 
                  cardTitle={item.item.name}
                />
              ))}
            </>
          )}
        </Await>
      </React.Suspense>

      
    </Dialog.Root>
  )
}

export default KitShow;