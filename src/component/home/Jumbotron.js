import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Card, Col, Container, Row } from "react-bootstrap"
import Banner from "../../asset/image/banner1.png"
import Navs from "../navbar/Navbar"

const style = {
  bg: {
    backgroundImage: `url(${Banner})`,
    // width: "100vh",
    height: "500px",
  },

  text: {
    marginTop: "125px",
  },
}

function Jumbotron() {
  return (
    <div className="mb-5" style={style.bg}>
      <Navs />
      <div className="intro">
        <Row>
          <Col className="text-center text-white" style={style.text}>
            <h1 className="mb-4 fw-bold">Connect on DumbSound</h1>
            <h3 className="fw-lighter">
              Discovery, Stream, and share a constantly expanding mix of music{" "}
              <br></br>
              from emerging and major artists around the world
            </h3>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Jumbotron
