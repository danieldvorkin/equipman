import { Field, Input } from '@chakra-ui/react';
import React from 'react';

const InputField = ({ label, required, placeholder, value, onChange }) => {
  return (
    <Field.Root required>
      <Field.Label>
        {label} {required && <Field.RequiredIndicator />}
      </Field.Label>
      <Input placeholder={placeholder} value={value} onChange={onChange}/>
    </Field.Root>
  )
}

export default InputField;