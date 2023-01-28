import React, { useContext, useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Container, Form, InputGroup } from "react-bootstrap"
import Navs from "../../component/navbar/Navbar"
import file from "../../asset/image/icon/file.png"
import { useMutation } from "react-query"
import { API } from "../../confiq/api"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

const style = {
  header: {
    color: "white",
    fontSize: "50px",
  },

  textDumb: {
    color: "#EE4622",
  },

  textWhite: {
    color: "white",
  },

  form: {
    backgroundColor: "#D2D2D2",
    border: "2px solid #D2D2D2",
    color: "#B1B1B1",
  },

  imgfile: {
    width: "20px",
    height: "30px",
  },

  bgButton: {
    width: "500px",
    color: "white",
    backgroundColor: "#EE4622",
  },
}

function Pay() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)
  const [trans, setTrans] = useState([])
  const id = state.user.id

  const getTrans = async () => {
    try {
      const response = await API.get("/transactions")
      const responbyid = response?.data.data.filter((p) => p.user.id === id)
      setTrans(responbyid)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getTrans()
  }, [state])

  const HandlePay = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post("/transaction")

      const token = response.data.data.token

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result)
          navigate("/")
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result)
          navigate("/")
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result)
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment")
        },
      })
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js"
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-9m3zb0scyClSg1so"

    let scriptTag = document.createElement("script")
    scriptTag.src = midtransScriptUrl
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey)

    document.body.appendChild(scriptTag)
    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  return (
    <>
      <Navs />
      {trans.length === 0 ? (
        <Container fluid>
          <h3 style={style.header} className="text-center pt-5 pb-4 ">
            Premium
          </h3>
          <div className="my-3 text-center">
            <p style={style.textWhite}>
              Bayar sekarang dan nikmati streaming music yang kekinian dari{" "}
              <label className="fw-bold">
                <label style={style.textDumb}>DUMB</label>SOUND
              </label>
            </p>
            <p style={style.textWhite}>
              <label className="fw-bold">
                <label style={style.textDumb}>DUMB</label>SOUND
              </label>{" "}
              : 0981312323
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              style={style.bgButton}
              className="my-4 fw-bold"
              type="submit"
              onClick={(e) => HandlePay.mutate(e)}
            >
              Pay
            </Button>
          </div>
        </Container>
      ) : (
        <Container fluid>
          <h3 style={style.header} className="text-center pt-5 pb-4 ">
            Anda Sudah Premium
          </h3>
          <div className="my-3 text-center">
            <p style={style.textWhite}>
              Nikmati streaming music yang kekinian dari{" "}
              <label className="fw-bold">
                <label style={style.textDumb}>DUMB</label>SOUND
              </label>
            </p>
            <p style={style.textWhite}>
              <label className="fw-bold">
                <label style={style.textDumb}>DUMB</label>SOUND
              </label>{" "}
              : 0981312323
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              style={style.bgButton}
              className="my-4 fw-bold"
              type="submit"
              onClick={() => navigate("/")}
            >
              Go To Home
            </Button>
          </div>
        </Container>
      )}
    </>
  )
}

export default Pay

// <Form>
//   <Form.Group className="mb-3 " controlId="formBasicEmail">
//     <Form.Control
//       // onChange={handleOnChange}
//       // value={dataLogin.email}
//       // name="email"
//       style={style.form}
//       type="number"
//       placeholder="Input your account number"
//     />
//   </Form.Group>
//   //
//   <Form.Group className="mb-3 ">
//     <InputGroup.Text style={style.color}>
//       Attache proof of transfer
//     </InputGroup.Text>
//     <Form.Control
//       // onChange={handleOnChange}
//       // value={dataLogin.email}
//       // name="email"
//       aria-label="Amount"
//       style={style.form}
//       // type="file"
//     />
//     <InputGroup.Text>
//       <img alt="" src={file} style={style.imgfile} />
//     </InputGroup.Text>
//   </Form.Group>
// </Form>
