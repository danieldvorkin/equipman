import { Button, Badge, Box, Card, Collapsible, HStack, Image } from "@chakra-ui/react";
import React from "react"

const AccordianCard = ({ resolvedKit, cardTitle, detailsCard = false }) => {
  return (
    <Collapsible.Root mt="2" mb="2">
              
      <Card.Root flexDirection="row" overflow="hidden">
        <Image
          objectFit="cover"
          maxW="300px"
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />
        <Box width="100%">
          <Card.Body>
            <Collapsible.Trigger style={{ textAlign: "left" }}>
              <Card.Title mb="2">{cardTitle}</Card.Title>
            </Collapsible.Trigger>
            {detailsCard && (
              <Card.Description>
                {resolvedKit?.version}v | {resolvedKit?.active ? 'Active' : 'Inactive'}
              </Card.Description>
            )}
            
            {detailsCard && (
              <HStack mt="4" mb="4">
                Author: <Badge>{resolvedKit?.createdBy?.email}</Badge>
              </HStack>
            )}

            <Collapsible.Content>
              <Box padding="4" borderWidth="1px">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </Box>
            </Collapsible.Content>
          </Card.Body>
          <Card.Footer>
            <Button>Action 1</Button>
          </Card.Footer>
        </Box>
      </Card.Root>

    </Collapsible.Root>
  );
}

export default AccordianCard;