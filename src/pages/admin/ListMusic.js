import "bootstrap/dist/css/bootstrap.min.css"
import React, { useContext, useEffect, useState } from "react"
import { Button, Container, Stack, Table } from "react-bootstrap"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import Audio from "../../component/audio/Audio"
import ArtistDetail from "../../component/modal/ArtistDetail"
import DeleteData from "../../component/modal/DeleteData"
import Navs from "../../component/navbar/Navbar"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"

const style = {
  header: {
    color: "white",
  },

  headerTable: {
    color: "#EE4622",
  },

  img: {
    widht: "50px",
    height: "50px",
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

function ListMusicAdmin() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)
  let { data: music, refetch } = useQuery("MusicTable", async () => {
    if (state.user.status === "admin") {
      const response = await API.get("/musics")
      return response.data.data
    }
  })

  // Artist Detail
  const [artistShow, setArtistShow] = useState(false)
  const handleCloseArtist = () => setArtistShow(false)
  const handleShowArtist = () => setArtistShow(true)
  const [dataArtist, setDataArtist] = useState()

  const handleArtistDetail = (data) => {
    setDataArtist(data)
    handleShowArtist()
  }

  // Music Detail
  const [audioShow, setAudioShow] = useState(false)
  const handleCloseAudio = () => setAudioShow(false)
  const handleShowAudio = () => setAudioShow(true)
  const [dataAudio, setDataAudio] = useState()

  const handleMusicDetail = (data) => {
    setDataAudio(data)
    handleShowAudio()
  }

  // Update Music

  const handleUpdate = (id) => {
    navigate("/updateMusic/" + id)
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
      await API.delete(`/music/${id}`, config)
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
          List Music
        </h4>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th style={style.headerTable}>No</th>
              <th style={style.headerTable}>Music Title</th>
              <th style={style.headerTable}>Tumbnail</th>
              <th style={style.headerTable}>Artist</th>
              <th style={style.headerTable}>Release Year</th>
              <th style={style.headerTable}>Music</th>
              <th style={style.headerTable}>Action</th>
            </tr>
          </thead>
          <tbody>
            {music === 0 ? (
              <tr>
                <td colSpan={6}>Not Transaction</td>
              </tr>
            ) : (
              music?.map((element, number) => {
                number += 1

                return (
                  <tr>
                    <th>{number}</th>
                    <th>{element.title}</th>
                    <th>
                      <img
                        style={style.img}
                        alt={element.tumbnail}
                        src={element.tumbnail}
                      />
                    </th>
                    <th
                      onClick={() => {
                        handleArtistDetail(element)
                      }}
                    >
                      {element.artist.name}
                    </th>
                    <th>{element.year}</th>
                    <th
                      onClick={() => {
                        handleMusicDetail(element)
                      }}
                    >
                      {element.title}.mp3
                    </th>
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
      <ArtistDetail
        show={artistShow}
        onHide={handleCloseArtist}
        dataArtist={dataArtist}
      />
      <Audio show={audioShow} onHide={handleCloseAudio} dataAudio={dataAudio} />
    </>
  )
}

export default ListMusicAdmin
