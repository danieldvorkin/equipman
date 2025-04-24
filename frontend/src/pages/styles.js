import { Card } from '@chakra-ui/react';
import styled from 'styled-components';

export const CustomCard = styled(Card.Root)`
  margin: auto;
  padding: 20px;
  margin-top: 100px;
`;

export const FilterCol = styled.div`
  width: ${({ isMobile }) => (isMobile ? '100%' : '250px')};
  padding: ${({ isMobile }) => (isMobile ? '0 0 20px 0' : '0 10px')};
  margin: ${({ isMobile }) => (isMobile ? '10px 0' : '0 10px')};
  position: ${({ isMobile }) => (isMobile ? 'static' : 'sticky')};
  top: 76px; 
  align-self: flex-start;
  height: fit-content;
`;

export const Dataview = styled.div`
  flex: 1;
`;

export const SectionTitle = styled.h3`
  border-bottom: 1px solid #ccc;
  padding-bottom: 6px;
  margin-bottom: 10px;
`;
