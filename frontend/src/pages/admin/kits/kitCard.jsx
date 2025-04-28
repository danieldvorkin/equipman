import { 
  Card, 
  Button, 
  HStack,
  Avatar,
  Stack,
  Text,
  Strong,
} from '@chakra-ui/react';
import React from 'react';
import { CustomLink } from '../../styles';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import client from '../../../ApolloClient';
import { useNavigate } from 'react-router-dom';
import { GET_KITS } from '../../../loaders/kitsLoader';

const CustomCard = styled(Card.Root)`
  flex-shrink: 0;
  flex-grow: 1;
  width: 100%;
`;

const DELETE_MUTATION = gql`
  mutation deleteKit($input: DeleteKitInput!){
    deleteKit(input: $input){
      errors
    }
  }
`;

const KitCard = ({ kit }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await client.mutate({
      mutation: DELETE_MUTATION,
      variables: {
        input: {
          id: kit.id,
        },
      },
    });
    if (response.data.deleteKit.errors.length > 0) {
      console.error('Error deleting kit:', response.data.deleteKit.errors);
    } else {
      navigate('/admin/kits');
    }
  }

  const EditBtnConfig = {
    to: `/admin/kits/${kit.id}`,
    variant: 'subtle',
    colorPalette: 'blue',
    flex: '1',
    as: CustomLink,
  }

  const DeleteBtnConfig = {
    variant: 'subtle',
    colorPalette: 'red',
    flex: '1',
    onClick: handleDelete,
  }

  return (
    <CustomCard>
      <Card.Body>
        <HStack mb="6" gap="3">
          <Avatar.Root>
            <Avatar.Fallback name={kit.name} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {kit.name}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {kit.version} - {kit.active ? 'Active' : 'Inactive'}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>
          <Strong color="fg">{kit.name} </Strong>
          {kit.description}
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button {...EditBtnConfig}>
          Edit
        </Button>
        <Button {...DeleteBtnConfig}>
          Delete
        </Button>
      </Card.Footer>
    </CustomCard>
  );
}
export default KitCard;