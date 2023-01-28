import React, { useContext } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Nav, OverlayTrigger, Popover } from "react-bootstrap"
import ImgProfile from "../../asset/image/profile.png"
import User from "../../asset/image/icon/user.png"
import AddMusic from "../../asset/image/icon/music.png"
import AddArtist from "../../asset/image/icon/people.png"
import Logout from "../../asset/image/icon/logout.png"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { useQuery } from "react-query"
import { API } from "../../confiq/api"

const style = {
  bgDropdown: {
    backgroundColor: "#3A3A3A",
  },

  link: {
    fontWeight: "600",
    fontSize: "17px",
    color: "white",
    alignItems: "center",
  },

  line: {
    backgroundColor: "#A8A8A8",
  },

  imgAddMusic: {
    width: "30px",
    marginRight: "15px",
  },

  imgAddArtist: {
    width: "30px",
    marginRight: "15px",
  },

  imgLogout: {
    width: "30px",
    marginRight: "15px",
  },

  trigger: {
    width: "70px",
    heigth: "70px",
  },

  imgProfile: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #EE4622",
  },
}

function DropdownAdmin({ logout }) {
  const [state] = useContext(UserContext)

  let { data: Profile } = useQuery("ProfileCache", async () => {
    const response = await API.get("/user/" + state.user.id)
    return response.data.data
  })

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom-end"
      overlay={
        <Popover id="popover-basic" style={style.bgDropdown}>
          <Popover.Body>
            <Nav.Link href="/profile" className="mb-4" style={style.link}>
              <img alt="" src={User} style={style.imgAddMusic} />
              Profile
            </Nav.Link>
            <Nav.Link href="/addMusic" className="mt-4" style={style.link}>
              <img alt="" src={AddMusic} style={style.imgAddMusic} />
              Add Music
            </Nav.Link>
            <Nav.Link href="/addArtist" className="mt-4" style={style.link}>
              <img alt="" src={AddArtist} style={style.imgAddArtist} />
              Add Artist
            </Nav.Link>
            <Nav.Link href="/listMusic" className="mt-4" style={style.link}>
              <img alt="" src={AddMusic} style={style.imgAddMusic} />
              List Music
            </Nav.Link>
            <Nav.Link href="/listArtist" className="mt-4" style={style.link}>
              <img alt="" src={AddArtist} style={style.imgAddArtist} />
              List Artist
            </Nav.Link>
          </Popover.Body>
          <hr style={style.line} />
          <Popover.Body>
            <Nav.Link onClick={logout} style={style.link}>
              <img alt="" src={Logout} style={style.imgLogout} />
              Logout
            </Nav.Link>
          </Popover.Body>
        </Popover>
      }
      style={style.trigger}
    >
      <img
        alt={Profile?.image === "" ? ImgProfile : Profile?.image}
        src={Profile?.image === "" ? ImgProfile : Profile?.image}
        className="d-inline-block align-top btn p-0 m-auto"
        style={style.imgProfile}
      />
    </OverlayTrigger>
  )
}

export default DropdownAdmin
