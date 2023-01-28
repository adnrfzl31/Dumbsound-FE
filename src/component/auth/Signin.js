import React, { useContext, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"
import { useMutation } from "react-query"

const style = {
  bg: {
    backgroundColor: "#161616",
  },

  header: {
    fontWeight: "900",
    fontSize: "36px",
    lineHeight: "49px",
    color: "white",
  },

  colorText: {
    color: "#B1B1B1",
  },

  bgButton: {
    backgroundColor: "#EE4622",
    color: "white",
  },

  link: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "white",
  },

  form: {
    backgroundColor: "#454545",
    border: "2px solid #D2D2D2",
    color: "white",
  },
}

function Signin({ show, onHide, setShowSignin, setShowRegister }) {
  const title = "Login"
  document.title = "Waysbucks | " + title

  // let navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)

  const [message, setMessage] = useState(null)
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  })

  const handleOnChange = (e) => {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      const body = JSON.stringify(dataLogin)

      const response = await API.post("/login", body, config)

      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        })

        // if (response.data.data.status === "1") {
        //   navigate("/admin")
        // } else {
        //   navigate("/")
        // }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        )
        setMessage(alert)
      }
      setShowSignin(false)
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      )
      setMessage(alert)
      console.log(error)
    }
  })

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body className="bg-dark">
        <Modal.Title style={style.header} className="mb-3">
          Signin
        </Modal.Title>
        {message && message}
        <Form
          onSubmit={(e) => handleSubmit.mutate(e)}
          className="w-100 m-auto mt-3 d-grid gap-2"
        >
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Control
              onChange={handleOnChange}
              // value={dataSignin.email}
              name="email"
              style={style.form}
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              onChange={handleOnChange}
              // value={dataSignin.password}
              name="password"
              style={style.form}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            variant="outline-none"
            className="fw-bold"
            style={style.bgButton}
            type="submit"
          >
            Signin
          </Button>
          <Form.Label style={style.colorText} className="text-center">
            Don't have an account ? Klik
            <Link
              className="ms-1"
              onClick={() => {
                setShowSignin(false)
                setShowRegister(true)
              }}
              style={style.link}
            >
              Here
            </Link>
          </Form.Label>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Signin
