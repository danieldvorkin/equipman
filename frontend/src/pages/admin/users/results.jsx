import { Table } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TableRow = styled(Table.Row)` cursor: pointer; `;

const Results = ({ users }) => {
  return (
    <Table.Root size="sm" interactive variant="outline" stickyHeader>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>ID</Table.ColumnHeader>
          <Table.ColumnHeader>Email</Table.ColumnHeader>
          <Table.ColumnHeader>Role</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users?.map((user) => (
          <TableRow key={user?.id}>
            <Table.Cell>{user?.id}</Table.Cell>
            <Table.Cell>
              <Link to={`/admin/users/${user?.id}`} style={{ color: 'inherit' }}>
                {user?.email}
              </Link>
            </Table.Cell>
            <Table.Cell>{user?.isAdmin ? 'Admin' : 'User'}</Table.Cell>
          </TableRow>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default Results;