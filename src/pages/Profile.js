import React, { useContext, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { UserContext } from "../context/UserContext"
import { useQuery } from "react-query"
import { API } from "../confiq/api"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import ImgProfile from "../asset/image/profile.png"
import Navs from "../component/navbar/Navbar"
import FormProfile from "../component/modal/UpdateProfile"

const style = {
  card: {
    width: "100%",
    backgroundColor: "#161616",
    border: "none",
  },

  title: {
    color: "#FFFFFF",
    fontSize: "24px",
    marginBottom: "20px",
  },

  imgProfile: {
    width: "100%",
    height: "310px",
  },

  btn: {
    backgroundColor: "#F58033",
    border: "none",
  },

  colorText: {
    color: "#FFFFFF",
  },
}

function Profile() {
  const [state] = useContext(UserContext)

  let { data: Profile, refetch } = useQuery("ProfileCache", async () => {
    const response = await API.get("/user/" + state.user.id)
    return response.data.data
  })

  const [profileShow, setProfileShow] = useState(false)
  const handleCloseProfile = () => setProfileShow(false)
  const handleShowProfile = () => setProfileShow(true)
  // const [dataProfile, setDataProfile] = useState()

  // const handleProfileDetail = (data) => {
  //   setDataProfile(data)
  //   handleShowProfile()
  // }

  return (
    <>
      <Navs />
      <Container className="my-5">
        {/* <Row className="justify-content-center my-5"> */}
        <Card border="white" style={style.card}>
          <h1 className="fw-bold mb-5" style={style.title}>
            MY PROFILE
          </h1>
          <Row>
            <Col md={3}>
              <Card.Img
                alt={Profile?.image === "" ? ImgProfile : Profile?.image}
                style={style.imgProfile}
                src={Profile?.image === "" ? ImgProfile : Profile?.image}
              />
              <Card.Body className="d-flex justify-content-center">
                <Button
                  onClick={handleShowProfile}
                  className="w-100"
                  style={style.btn}
                >
                  Update Profile
                </Button>
              </Card.Body>
            </Col>
            <Col>
              <Card.Body className="mb-5">
                <Card.Title style={style.colorText}>Full Name</Card.Title>
                <Card.Text style={style.colorText}>
                  {Profile?.fullname}
                </Card.Text>
                <Card.Title style={style.colorText}>Email</Card.Title>
                <Card.Text style={style.colorText}>{Profile?.email}</Card.Text>
                <Card.Title style={style.colorText}>Gender</Card.Title>
                <Card.Text style={style.colorText}>{Profile?.gender}</Card.Text>
                <Card.Title style={style.colorText}>Phone</Card.Title>
                <Card.Text style={style.colorText}>{Profile?.phone}</Card.Text>
                <Card.Title style={style.colorText}>Address</Card.Title>
                <Card.Text style={style.colorText}>
                  {Profile?.address}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
        {/* </Row> */}
      </Container>
      <FormProfile
        show={profileShow}
        onHide={handleCloseProfile}
        setProfileShow={setProfileShow}
        // data={dataProfile}
      />
    </>
  )
}

export default Profile
