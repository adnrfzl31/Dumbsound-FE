import React, { useContext } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Nav, OverlayTrigger, Popover } from "react-bootstrap"
import ImgProfile from "../../asset/image/profile.png"
import User from "../../asset/image/icon/user.png"
import Pay from "../../asset/image/icon/bill.png"
import Logout from "../../asset/image/icon/logout.png"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"

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

  imgPay: {
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

function DropdownUser({ logout }) {
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
              <img alt="" src={User} style={style.imgPay} />
              Profile
            </Nav.Link>
            <Nav.Link href="/pay" style={style.link}>
              <img alt="" src={Pay} style={style.imgPay} />
              Pay
            </Nav.Link>
          </Popover.Body>
          <hr style={style.line} />
          <Popover.Body onClick={logout}>
            <Nav.Link style={style.link}>
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

export default DropdownUser
