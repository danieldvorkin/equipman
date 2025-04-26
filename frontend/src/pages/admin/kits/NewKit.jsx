import React from 'react';
import BreadCrumbs from "../../../components/BreadCrumbs";
import { Flex } from '@chakra-ui/react';

const NewKit = () => {
  return (
    <div style={{ marginTop: 20 }}>
      <BreadCrumbs />
      <h1>Create New Kit</h1>
    </div>
  );
}

export default NewKit;