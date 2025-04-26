import React from 'react';
import BreadCrumbs from "../../../components/BreadCrumbs";
import { Flex, Input, Button, Container, Checkbox, ButtonGroup } from '@chakra-ui/react';
import { Form } from 'react-router-dom';

const FlexConfig = {
  direction: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}

const FormInput = ({ name, type, placeholder, required, defaultValue }) => {
  return (
    <Input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
      style={{ marginBottom: 10 }}
    />
  );
}

const FormCheckbox = ({ name, placeholder, required, defaultValue }) => {
  return (
    <Checkbox.Root 
      name={name} 
      defaultChecked={defaultValue} 
      style={{ marginBottom: 10, width: '100%' }} 
      required={required}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label style={{ marginLeft: 10 }}>{placeholder}</Checkbox.Label>
    </Checkbox.Root>
  );
}

const NewKit = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const inputFields = [
    { element: <FormInput name="name" type="text" placeholder="Name" required={true} /> },
    { element: <FormInput name="description" type="text" placeholder="Description" required={true} /> },
    { element: <FormInput name="version" type="text" placeholder="Version" required={true} /> },
    { element: <FormCheckbox name="active" placeholder="Active" required={false} /> },
    { element: <input type="hidden" name="createdById" value={user.id} /> },
  ];

  return (
    <Container fluid style={{ marginTop: 20 }}>
      <BreadCrumbs />
      <h1>Create a New Kit</h1>
      <Form method="post">
        <Flex {...FlexConfig}>
          {inputFields.map((field, index) => (
            field.element
          ))}
        </Flex>
        
        <hr/>

        <ButtonGroup style={{ marginTop: 20, float: 'right' }}>
          <Button type="button" variant="outline" colorScheme="blue" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit">Create Kit</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default NewKit;