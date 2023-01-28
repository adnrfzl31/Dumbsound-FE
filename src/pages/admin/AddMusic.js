import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import Navs from "../../component/navbar/Navbar"
import { useMutation, useQuery } from "react-query"
import PopUpMusic from "../../component/popup/PopUpMusic"
import { API } from "../../confiq/api"
import { Navigate, useNavigate } from "react-router-dom"

const style = {
  header: {
    color: "white",
  },

  formAll: {
    width: "90%",
  },

  form: {
    backgroundColor: "#454545",
    border: "2px solid #D2D2D2",
    color: "white",
  },

  bgButton: {
    width: "90%",
    color: "white",
    backgroundColor: "#EE4622",
  },
}

function AddMusic() {
  const [preview, setPreview] = useState(null)
  const [DataMusic, setDataMusic] = useState({
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

  const handleOnChange = (e) => {
    setDataMusic({
      ...DataMusic,
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

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      // Store data with FormData as object
      const formData = new FormData()
      formData.set("title", DataMusic.title)
      formData.set("year", DataMusic.year)
      formData.set("artistId", DataMusic.artistId)
      formData.set(
        "tumbnail",
        DataMusic.tumbnail[0],
        DataMusic.tumbnail[0].name
      )
      formData.set("music", DataMusic.music[0], DataMusic.music[0].name)

      // Insert product data
      const response = await API.post("/music", formData, config)

      // navigate("/add-product")
    } catch (error) {
      console.log(error)
    }
  })

  const [modalShow, setModalShow] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => {
    setModalShow(false)
    navigate("/listMusic")
  }

  return (
    <>
      <Navs />
      <Container className="my-5">
        <Row>
          <Col xs={9}>
            <h4 className="fw-bold my-4" style={style.header}>
              Add Music
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
                          // value={dataMusic?.title}
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
                      // value={dataMusic?.year}
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
                      // value={dataMusic?.artistId}
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
                  onClick={() => {
                    setModalShow(true)
                  }}
                >
                  Add Music
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
      <PopUpMusic show={modalShow} onHide={handleClose} />
    </>
  )
}

export default AddMusic
