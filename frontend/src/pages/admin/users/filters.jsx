import { Accordion, Checkbox, CloseButton, Input, InputGroup, Span, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  const [emailSearch, setEmailSearch] = React.useState(searchParams.get('email') || '');
  const inputRef = React.useRef(null);

  const handleClick = (event) => {
    const { value } = event.target;
    const isChecked = event.target.checked;

    if (isChecked) {
      navigate(`/admin/users?role=${value}`);
    } else {
      navigate(`/admin/users`);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (emailSearch) {
        searchParams.set('email', emailSearch);
      } else {
        searchParams.delete('email');
      }
      // Reset to page 1 on filter change
      searchParams.set('page', 1);
  
      navigate(`/admin/users?${searchParams.toString()}`);
    }, 300); // debounce delay in ms
  
    return () => clearTimeout(timeout); // cleanup
  }, [emailSearch]);

  useEffect(() => {
    setRoles(searchParams.get('role') ? searchParams.get('role').split(',') : []);
  }, [searchParams]);

  const endElement = emailSearch ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setEmailSearch("")
        inputRef.current.focus();
      }}
      me="-2"
    />
  ) : undefined

  return (
    <div>
      <Accordion.Root collapsible multiple>
        <Accordion.Item value="search">
          <Accordion.ItemTrigger>
            <Span flex="1">Search</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack>
                <InputGroup endElement={endElement}>
                  <Input
                    type="text"
                    ref={inputRef}
                    placeholder="Search by email"
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                  />
                </InputGroup>
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>

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