import Navbar from '../components/Navbar'
import '../styles/admin.css'
import { useEffect, useState } from 'react'
import api from '../api/AxiosConfig'

function AdminUsers() {

  const [users, setUsers] = useState([])

  useEffect(() => {

    fetchUsers()

  }, [])

  const fetchUsers = async () => {

    try {

      const response =
        await api.get('/users')

      setUsers(response.data)

    } catch (error) {

      console.error(error)
    }
  }

  const deleteUser = async (id) => {

    const confirmDelete =
      window.confirm(
        'Are you sure?'
      )

    if (!confirmDelete) return

    try {

      await api.delete(`/users/${id}`)

      alert(
        'User Deleted Successfully'
      )

      fetchUsers()

    } catch (error) {

      console.error(error)

      alert(
        'Failed to Delete User'
      )
    }
  }

  return (

    <>
      <Navbar />

      <div className="admin-page">

        <h1>
          Manage Users
        </h1>

        <table className="orders-table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map(user => (

              <tr key={user.id}>

                <td>
                  {user.id}
                </td>

                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      deleteUser(user.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>
  )
}

export default AdminUsers