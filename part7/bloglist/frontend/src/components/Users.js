import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table, Header } from 'semantic-ui-react'

const Users = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const  usersStore = useSelector(state => state.users)

  return (
    <>
      <Header as='h2'>Users</Header>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {usersStore.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell >
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell >
                {user.blogs.length}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  )
}
export default Users