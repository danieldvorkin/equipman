import { Accordion, Checkbox, Span, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
];

const CheckboxLabel = styled(Checkbox.Label)`
  margin-left: 10px;
`;

const Filters = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [roles, setRoles] = React.useState([]);

  const handleClick = (event) => {
    const { value } = event.target;
    const isChecked = event.target.checked;

    const params = new URLSearchParams(searchParams.toString());
    if (isChecked) {
      params.set('role', value);
    } else {
      params.delete('role');
    }
    
    navigate(`/admin/users?${params.toString()}`);
  }

  useEffect(() => {
    setRoles(searchParams.get('role') ? searchParams.get('role').split(',') : []);
  }, [searchParams]);

  return (
    <div>
      <Accordion.Root collapsible multiple>
        <Accordion.Item value="roles">
          <Accordion.ItemTrigger>
            <Span flex="1">Roles</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>

          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack>
                {ROLES.map((role) => (
                  <Checkbox.Root onClick={handleClick} key={role.value} checked={roles.includes(role.value)}>
                    <Checkbox.HiddenInput value={role.value} />
                    <Checkbox.Control />
                    <CheckboxLabel>
                      {role.label}
                    </CheckboxLabel>
                  </Checkbox.Root> 
                ))}
              </Stack>

            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

      </Accordion.Root>
    </div>
  );
}
export default Filters;