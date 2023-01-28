import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, Stack, Table } from "react-bootstrap"
import imgMusic from "../../asset/image/Music.png"
import Music from "../../asset/audio/Hindia-Evaluasi.mp3"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { API } from "../../confiq/api"

const style = {
  bgModal: {
    backgroundColor: "#3A3A3A",
  },

  title: {
    color: "#EE4622",
    fontSize: "25px",
  },

  headerTable: {
    color: "#EE4622",
  },
}

function ArtistDetail({ show, onHide, dataArtist }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={style.bgModal}>
        <h3 style={style.title}>Artist</h3>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th style={style.headerTable}>No</th>
              <th style={style.headerTable}>Name Artist</th>
              <th style={style.headerTable}>Old</th>
              <th style={style.headerTable}>Type Artist Group</th>
              <th style={style.headerTable}>Start Career</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>{dataArtist?.artist.name}</th>
              <th>{dataArtist?.artist.old} Years</th>
              <th>{dataArtist?.artist.artist}</th>
              <th>{dataArtist?.artist.career}</th>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  )
}

export default ArtistDetail
