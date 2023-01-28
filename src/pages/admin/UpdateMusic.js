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
import Modal from "react-bootstrap/Modal"
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

function UpdateMusic({ setUpdateShow }) {
  const navigate = useNavigate()
  // const [state, dispatch] = useContext(UserContext)
  const { id } = useParams()
  const [message, setMessage] = useState(null)

  const [music, setMusic] = useState({})
  const [preview, setPreview] = useState(null)
  const [dataMusic, setDataMusic] = useState({
    title: "",
    tumbnail: "",
    year: 0,
    artistId: 0,
    music: "",
  })

  let { data: artists } = useQuery("artistCache", async () => {
    const response = await API.get("/artists")
    return response.data.data
  })

  let { data: MusicUpdate, refetch } = useQuery(
    "MusicUpdateCache",
    async () => {
      const response = await API.get("/music/" + id)
      return response.data.data
    }
  )

  useEffect(() => {
    if (MusicUpdate) {
      setPreview(MusicUpdate.tumbnail)
      setDataMusic({
        ...dataMusic,
        title: MusicUpdate.title,
        year: MusicUpdate.year,
        artistId: MusicUpdate.artistId,
        music: MusicUpdate.music,
      })
      setMusic(MusicUpdate)
    }
  }, [MusicUpdate])

  const handleOnChange = (e) => {
    setDataMusic({
      ...dataMusic,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
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

      // const body = JSON.stringify(dataProfile)
      const formData = new FormData()
      formData.set("title", dataMusic.title)
      formData.set("year", dataMusic.year)
      formData.set("artistId", dataMusic.artistId)
      formData.set(
        "tumbnail",
        dataMusic.tumbnail[0],
        dataMusic.tumbnail[0].name
      )
      formData.set("music", dataMusic.music[0], dataMusic.music[0].name)

      const response = await API.patch("/music/" + id, formData, config)

      refetch()
      navigate("/listMusic")
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
        <Row>
          <Col xs={9}>
            <h4 className="fw-bold my-4" style={style.header}>
              Update Music
            </h4>
            <Form
              onSubmit={(e) => handleSubmit.mutate(e)}
              style={style.formAll}
              className="m-auto mt-3 d-grid gap-2"
            >
              <Row>
                <Col>
                  <Row>
                    <Col xs={7}>
                      <Form.Group className="mb-3 " controlId="title">
                        <Form.Control
                          value={dataMusic?.title}
                          onChange={handleOnChange}
                          name="title"
                          style={style.form}
                          type="text"
                          placeholder="Title"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="tumbnail">
                        <Form.Control
                          onChange={handleOnChange}
                          // value={dataMusic?.image}
                          name="tumbnail"
                          style={style.form}
                          type="file"
                          placeholder="Tumbnail"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3" controlId="year">
                    <Form.Control
                      onChange={handleOnChange}
                      value={dataMusic?.year}
                      name="year"
                      style={style.form}
                      type="number"
                      placeholder="Year"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Select
                      style={style.form}
                      onChange={handleOnChange}
                      value={dataMusic?.artistId}
                      name="artistId"
                    >
                      <option hidden>Artist</option>
                      {artists?.map((artist) => (
                        <option value={artist.id}>{artist.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="music">
                    <Form.Control
                      onChange={handleOnChange}
                      // value={dataLogin.music}
                      name="music"
                      style={style.form}
                      type="file"
                      placeholder="Music"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-center">
                <Button
                  variant="outline-none"
                  className="fw-bold w-100 mx-3"
                  style={style.bgButton}
                  type="submit"
                  // onClick={() => {
                  //   setModalShow(true)
                  // }}
                >
                  Update Music
                </Button>
              </div>
            </Form>
          </Col>
          <Col>
            {preview && (
              <Card.Img
                variant="top"
                src={preview}
                alt={preview}
                className="mt-5"
                style={style.ImgProfile}
              />
            )}
          </Col>
        </Row>
      </Container>
      {/* <PopUpMusic show={modalShow} onHide={handleClose} /> */}
    </>
  )
}

export default UpdateMusic
