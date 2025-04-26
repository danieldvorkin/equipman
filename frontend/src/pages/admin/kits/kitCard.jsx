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

const CustomCard = styled(Card.Root)`
  flex-shrink: 0;
  flex-grow: 1;
  width: 100%;
`;

const KitCard = ({ kit }) => {
  const EditBtnConfig = {
    to: `/admin/kits/${kit.id}`,
    variant: 'subtle',
    colorPalette: 'blue',
    flex: '1',
    as: CustomLink,
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
        <Button variant="subtle" colorPalette="red" flex="1">
          Delete
        </Button>
      </Card.Footer>
    </CustomCard>
  );
}
export default KitCard;