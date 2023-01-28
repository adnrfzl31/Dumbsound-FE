import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import Navs from "../../component/navbar/Navbar"
import { useMutation } from "react-query"
import { API } from "../../confiq/api"
import PopUpArtist from "../../component/popup/PopUpArtist"
import { useNavigate } from "react-router-dom"

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
    color: "#B1B1B1",
  },

  bgButton: {
    width: "90%",
    color: "white",
    backgroundColor: "#EE4622",
  },
}

function AddArtist() {
  const navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false)
  const handleClose = () => {
    setModalShow(false)
    navigate("/listArtist")
  }
  // const [preview, setPreview] = useState(null)
  const [dataArtist, setDataArtist] = useState({
    name: "",
    old: 0,
    artist: "",
    career: "",
  })

  const handleOnChange = (e) => {
    setDataArtist({
      ...dataArtist,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      const data = {
        name: dataArtist.name,
        old: parseInt(dataArtist.old),
        artist: dataArtist.artist,
        career: dataArtist.career,
      }

      // Data body
      const body = JSON.stringify(data)

      // Insert product data
      const response = await API.post("/artist", body, config)

      // navigate("/addArtist")
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <>
      <Navs />
      <Container className="my-5">
        <h4 className="fw-bold my-4" style={style.header}>
          Add Artist
        </h4>
        <Row>
          <Col>
            <Form
              onSubmit={(e) => handleSubmit.mutate(e)}
              style={style.formAll}
              className="m-auto mt-3 d-grid gap-2"
            >
              <Form.Group className="mb-3 " controlId="name">
                <Form.Control
                  // value={dataLogin.name}
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
                  // value={dataLogin.old}
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
                  // value={dataLogin.career}
                  name="career"
                  style={style.form}
                  type="text"
                  placeholder="Start Career"
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  variant="outline-none"
                  className="fw-bold"
                  style={style.bgButton}
                  type="submit"
                  onClick={() => {
                    setModalShow(true)
                  }}
                >
                  Add Artist
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <PopUpArtist show={modalShow} onHide={handleClose} />
    </>
  )
}

export default AddArtist
