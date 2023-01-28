import React, { useContext, useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import { Nav } from "react-bootstrap"
import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Pay from "./pages/user/Pay"
import Income from "./pages/admin/Income"
import AddMusic from "./pages/admin/AddMusic"
import AddArtist from "./pages/admin/AddArtist"
import Navs from "./component/navbar/Navbar"
import { UserContext } from "./context/UserContext"
import { API, setAuthToken } from "./confiq/api"
import Profile from "./pages/Profile"
import ListArtistAdmin from "./pages/admin/ListArtist"
import ListMusicAdmin from "./pages/admin/ListMusic"
import UpdateMusic from "./pages/admin/UpdateMusic"
import UpdateArtist from "./pages/admin/UpdateArtist"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    if (state.isLogin === false && !isLoading) {
      navigate("/")
    }
  }, [state])

  const checkUser = async () => {
    try {
      // Send data to useContext
      const response = await API.get("/check-auth")

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        })
      }

      let payload = response.data.data
      payload.token = localStorage.token

      dispatch({
        type: "USER_SUCCESS",
        payload,
      })
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>
      {isLoading ? null : (
        <>
          {/* <Navs /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/addMusic" element={<AddMusic />} />
            <Route path="/updateMusic/:id" element={<UpdateMusic />} />
            <Route path="/listMusic" element={<ListMusicAdmin />} />
            <Route path="/addArtist" element={<AddArtist />} />
            <Route path="/updateArtist/:id" element={<UpdateArtist />} />
            <Route path="/listArtist" element={<ListArtistAdmin />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
