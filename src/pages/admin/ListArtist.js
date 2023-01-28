import React, { useContext, useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Navs from "../../component/navbar/Navbar"
import { Button, Container, Stack, Table } from "react-bootstrap"
import { UserContext } from "../../context/UserContext"
import { useMutation, useQuery } from "react-query"
import { API } from "../../confiq/api"
import { useNavigate } from "react-router-dom"
import DeleteData from "../../component/modal/DeleteData"

const style = {
  header: {
    color: "white",
  },

  headerTable: {
    color: "#EE4622",
  },

  active: {
    color: "#0ACF83",
  },

  pending: {
    color: "#F7941E",
  },

  notActive: {
    color: "#FF0000",
  },
}

function ListArtistAdmin() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)
  let { data: artist, refetch } = useQuery("ArtistTable", async () => {
    if (state.user.status === "admin") {
      const response = await API.get("/artists")
      return response.data.data
    }
  })

  // update muasic
  const handleUpdate = (id) => {
    navigate("/updateArtist/" + id)
  }

  // delete Music
  const [idDelete, setIdDelete] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const [deleteShow, setShowDelete] = useState(false)
  const handleCloseDelete = () => setShowDelete(false)
  const handleShowDelete = () => setShowDelete(true)

  const handleDelete = (id) => {
    setIdDelete(id)
    handleShowDelete()
  }

  const deleteById = useMutation(async (id) => {
    try {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      }
      await API.delete(`/artist/${id}`, config)
      refetch()
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleCloseDelete()
      // execute delete data by id function
      deleteById.mutate(idDelete)
      setConfirmDelete(null)
    }
  }, [confirmDelete])

  return (
    <>
      <Navs />
      <Container className="my-5">
        <h4 className="my-5" style={style.header}>
          List Artist
        </h4>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th style={style.headerTable}>No</th>
              <th style={style.headerTable}>Name Artist</th>
              <th style={style.headerTable}>Old</th>
              <th style={style.headerTable}>Type Artist Group</th>
              <th style={style.headerTable}>Start Career</th>
              <th style={style.headerTable}>Action</th>
            </tr>
          </thead>
          <tbody>
            {artist === 0 ? (
              <tr>
                <td colSpan={5}>Not Transaction</td>
              </tr>
            ) : (
              artist?.map((element, number) => {
                number += 1

                return (
                  <tr>
                    <th>{number}</th>
                    <th>{element.name}</th>
                    <th>{element.old} Years</th>
                    <th>{element.artist}</th>
                    <th>{element.career}</th>
                    <th>
                      <Stack
                        direction="horizontal"
                        gap={3}
                        className="justify-content-center mt-2"
                      >
                        <Button
                          className="w-50 p-0"
                          size="sm"
                          style={{
                            border: "white",
                            backgroundColor: "#0ACF83",
                          }}
                          onClick={() => {
                            handleUpdate(element.id)
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          className="w-50 p-0"
                          size="sm"
                          style={{
                            border: "white",
                            backgroundColor: "#FF0742",
                          }}
                          onClick={() => {
                            handleDelete(element.id)
                          }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </th>
                  </tr>
                )
              })
            )}
          </tbody>
        </Table>
      </Container>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={deleteShow}
        handleClose={handleCloseDelete}
      />
    </>
  )
}

export default ListArtistAdmin
