import React, { useContext, useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Card, Col, Container, Row, Stack } from "react-bootstrap"
import Music from "../../asset/image/Music.png"
import Audio from "../audio/Audio"
import { Link, useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"
import Signin from "../auth/Signin"
import Register from "../auth/Register"

const style = {
  Card: {
    width: "18rem",
    backgroundColor: "#3A3A3A",
  },

  header: {
    color: "#EE4622",
  },

  colorWhite: {
    color: "white",
  },
}
function ListMusic() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)
  const [showSignin, setShowSignin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  let { data: musics, refetch } = useQuery("musicCache", async () => {
    const response = await API.get("/musics")
    return response.data.data
  })

  const [audioShow, setAudioShow] = useState(false)
  const handleClose = () => setAudioShow(false)
  const handleShow = () => setAudioShow(true)
  const [dataAudio, setDataAudio] = useState()

  const handleMusicDetail = (data) => {
    setDataAudio(data)
    handleShow()
  }

  return (
    <div className="my-5 p-0">
      <h4 className="text-center fw-bold my-5" style={style.header}>
        Dengarkan Dan Rasakan
      </h4>
      <Row className="d-flex gap-4 justify-content-center">
        {musics?.map((music) => (
          <Card
            style={style.Card}
            // className="btn"
            onClick={() => {
              state.isLogin === false
                ? setShowSignin(true)
                : state.user.subscribe === "false"
                ? navigate("/Pay")
                : handleMusicDetail(music)
            }}
          >
            <Card.Img variant="top" src={music.tumbnail} className="p-4 pb-2" />
            <Card.Body className="p-4 pt-3">
              <Stack direction="horizontal" className="justify-content-between">
                <Card.Title style={style.colorWhite}>{music.title}</Card.Title>
                <Card.Title style={style.colorWhite}>{music.year}</Card.Title>
              </Stack>
              <Card.Text style={style.colorWhite}>
                {music.artist.name}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}

        <Audio show={audioShow} onHide={handleClose} dataAudio={dataAudio} />
        <Signin
          show={showSignin}
          onHide={() => setShowSignin(false)}
          setShowSignin={setShowSignin}
          setShowRegister={setShowRegister}
        />
        <Register
          show={showRegister}
          onHide={() => setShowRegister(false)}
          setShowSignin={setShowSignin}
          setShowRegister={setShowRegister}
        />
      </Row>
    </div>
  )
}

export default ListMusic
