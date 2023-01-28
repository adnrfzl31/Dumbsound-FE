import React, { useContext, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Container, Nav, Navbar, Stack } from "react-bootstrap"
import DropdownAdmin from "../dropdown/DropdownAdmin"
import DropdownUser from "../dropdown/DropdownUser"
import Logo from "../../asset/image/icon/Logo3.png"
import LogoPremium from "../../asset/image/icon/LogoPremium.png"
import Signin from "../auth/Signin"
import Register from "../auth/Register"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import { API } from "../../confiq/api"

const style = {
  navTransparant: {
    backgrond: "rgba(0,0,0,0.4)",
  },

  btnColor: {
    backgroundColor: "#EE4622",
    color: "white",
    outline: "none",
  },

  btnOutline: {
    backgroundColor: "EE4622",
    border: "2px solid #EE4622",
    color: "white",
  },
}

function Navs() {
  const [state, dispatch] = useContext(UserContext)

  let { data: Profile } = useQuery("ProfileCache", async () => {
    const response = await API.get("/user/" + state.user.id)
    return response.data.data
  })

  const [showSignin, setShowSignin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  let navigate = useNavigate()

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    })
    navigate("/")
  }

  return (
    <Navbar collapseOnSelect expand="lg" style={style.navTransparant}>
      <Container fluid className="px-5 py-2">
        <Navbar.Brand href="/">
          {state.isLogin === false ? (
            <img
              alt=""
              src={Logo}
              width="50%"
              // height="50"
              className="d-inline-block align-top"
            />
          ) : (
            <>
              {state.user.subscribe === "false" ? (
                // logo biasa
                <img
                  alt=""
                  src={Logo}
                  width="50%"
                  // height="50"
                  className="d-inline-block align-top"
                />
              ) : (
                // logo premium
                <img
                  alt=""
                  src={LogoPremium}
                  width="50%"
                  // height="50"
                  className="d-inline-block align-top"
                />
              )}
            </>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end gap-3"
        >
          <Nav className="me-auto"></Nav>
          <Nav>
            {state.isLogin === false ? (
              <>
                <Button
                  className="px-5 me-4"
                  size="sm"
                  variant="outline-danger"
                  style={style.btnOutline}
                  onClick={() => setShowSignin(true)}
                >
                  Signin
                </Button>
                <Button
                  className="px-5 "
                  size="sm"
                  variant="outline-none"
                  style={style.btnColor}
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </Button>

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
              </>
            ) : (
              <>
                {state.user.status === "admin" ? (
                  // Navbar Admin
                  <DropdownAdmin logout={logout} />
                ) : (
                  // Navbar User
                  <DropdownUser logout={logout} />
                  // userDropdown={userDropdown} logOut={logOut}
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navs
