import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Nav, OverlayTrigger, Popover } from "react-bootstrap"
import Action from "../../asset/image/icon/action.png"
// import AddMusic from "../../asset/image/icon/music.png"
// import AddArtist from "../../asset/image/icon/people.png"
// import Logout from "../assets/image/icon/logout.png"

const style = {
  bgDropdown: {
    backgroundColor: "#3A3A3A",
  },

  linkApprove: {
    fontWeight: "600",
    fontSize: "17px",
    alignItems: "center",
    color: "#0ACF83",
  },

  linkCancel: {
    fontWeight: "600",
    fontSize: "17px",
    alignItems: "center",
    color: "#FF0000",
  },

  trigger: {
    width: "70px",
    heigth: "70px",
  },
}

const popover = (
  <Popover id="popover-basic" style={style.bgDropdown}>
    <Popover.Body>
      <Nav.Link
        // onClick={}
        style={style.linkApprove}
      >
        Approved
      </Nav.Link>
      <Nav.Link
        // onClick={}
        className="mt-4"
        style={style.linkCancel}
      >
        Cancel
      </Nav.Link>
    </Popover.Body>
  </Popover>
)

const DropdownApprove = () => (
  <OverlayTrigger
    trigger="click"
    placement="bottom-end"
    overlay={popover}
    style={style.trigger}
  >
    <img
      alt=""
      src={Action}
      className="d-inline-block align-top btn p-0 m-auto"
    />
  </OverlayTrigger>
)

export default DropdownApprove
