import React, { useContext } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import { Container } from "react-bootstrap"
import ListMusic from "../component/home/ListMusic"
import Jumbotron from "../component/home/Jumbotron"
import Navs from "../component/navbar/Navbar"
import { UserContext } from "../context/UserContext"
import Income from "./admin/Income"

function Home() {
  const [state, dispatch] = useContext(UserContext)

  return (
    <>
      {state.isLogin === false ? (
        <Container fluid className="p-0">
          <Jumbotron />
          <ListMusic />
        </Container>
      ) : state.user.status === "admin" ? (
        <Container fluid className="p-0">
          <Income />
        </Container>
      ) : (
        <Container fluid className="p-0">
          <Jumbotron />
          <ListMusic />
        </Container>
      )}
    </>
  )
}

export default Home
