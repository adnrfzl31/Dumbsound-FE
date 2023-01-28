import React, { useContext, useEffect, useState } from "react"
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap"
// import Modal from "react-bootstrap/Modal"
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import Navs from "../../component/navbar/Navbar"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"

const style = {
  // bg: {
  //   background: "#161616",
  // },

  header: {
    fontWeight: "900",
    fontSize: "30px",
    lineHeight: "49px",
    color: "white",
  },

  ImgProfile: {
    // position: "relative",
    width: "100%",
    height: "300px",
  },

  form: {
    backgroundColor: "#454545",
    border: "2px solid #D2D2D2",
    // color: "white",
    color: "#b9b9b9",
  },

  colorTextarea: {
    color: "#b9b9b9",
  },

  formTextarea: {
    height: "100px",
    resize: "none",
    backgroundColor: "#454545",
    color: "#b9b9b9",
    border: "2px solid #D2D2D2",
  },

  bgButton: {
    color: "white",
    backgroundColor: "#EE4622",
  },
}

function UpdateArtist({ setUpdateShow }) {
  const navigate = useNavigate()
  // const [state, dispatch] = useContext(UserContext)
  const { id } = useParams()
  const [message, setMessage] = useState(null)

  const [artist, setArtist] = useState({})
  const [preview, setPreview] = useState(null)
  const [dataArtist, setDataArtist] = useState({
    name: "",
    old: 0,
    artist: "",
    career: "",
  })

  let { data: ArtistUpdate, refetch } = useQuery(
    "ArtistUpdateCache",
    async () => {
      const response = await API.get("/artist/" + id)
      return response.data.data
    }
  )

  useEffect(() => {
    if (ArtistUpdate) {
      setDataArtist({
        ...dataArtist,
        name: ArtistUpdate.name,
        old: ArtistUpdate.old,
        artist: ArtistUpdate.artist,
        career: ArtistUpdate.career,
      })
      setArtist(ArtistUpdate)
    }
  }, [ArtistUpdate])

  const handleOnChange = (e) => {
    setDataArtist({
      ...dataArtist,
      [e.target.name]: e.target.value,
    })

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
      // setPhotoProduct(<p className="txt-black">{url}</p>)
    }
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      const data = {
        name: dataArtist.name,
        old: parseInt(dataArtist.old),
        artist: dataArtist.artist,
        career: dataArtist.career,
      }

      const body = JSON.stringify(data)
      const response = await API.patch(
        "/artist/" + ArtistUpdate.id,
        body,
        config
      )

      navigate("/listArtist")
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      )
      setMessage(alert)
      console.log(error)
    }
  })

  return (
    <>
      <Navs />
      <Container className="my-5">
        <h4 className="fw-bold my-4" style={style.header}>
          Update Artist
        </h4>
        <Form
          onSubmit={(e) => handleSubmit.mutate(e)}
          style={style.formAll}
          className="m-auto mt-3 d-grid gap-2"
        >
          <Form.Group className="mb-3 " controlId="name">
            <Form.Control
              value={dataArtist?.name}
              onChange={handleOnChange}
              name="name"
              style={style.form}
              type="text"
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="old">
            <Form.Control
              onChange={handleOnChange}
              value={dataArtist?.old}
              name="old"
              style={style.form}
              type="number"
              placeholder="Old"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Select
              style={style.form}
              onChange={handleOnChange}
              value={dataArtist?.artist}
              name="artist"
            >
              <option hidden>Artist Group</option>
              <option value="solo">Solo</option>
              <option value="duo">Duo</option>
              onChange={handleOnChange}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="career">
            <Form.Control
              onChange={handleOnChange}
              value={dataArtist?.career}
              name="career"
              style={style.form}
              type="text"
              placeholder="Start Career"
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              variant="outline-none"
              className="fw-bold w-100 mx-5"
              style={style.bgButton}
              type="submit"
              // onClick={() => {
              //   setModalShow(true)
              // }}
            >
              Add Artist
            </Button>
          </div>
        </Form>
      </Container>
      {/* <PopUpArtist show={modalShow} onHide={handleClose} /> */}
    </>
  )
}

export default UpdateArtist
