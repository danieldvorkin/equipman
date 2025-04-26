import { 
  Card, 
  Button 
} from '@chakra-ui/react';
import React from 'react';

const KitCard = ({ kit }) => {
  return (
    <Card.Root variant={"elevated"}>
      <Card.Header>
        <Card.Title>{kit.name}</Card.Title>
        <Card.Description>{kit.description}</Card.Description>
      </Card.Header>
      <Card.Body>
        <p>Version: {kit.version}</p>
        <p>Active: {kit.active ? 'Yes' : 'No'}</p>
        <p>Created By: {kit.createdBy.email}</p>
      </Card.Body>
      <Card.Footer>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Card.Footer>
    </Card.Root>
  );
}
export default KitCard;