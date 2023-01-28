import React, { useContext } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Table } from "react-bootstrap"
import Navs from "../../component/navbar/Navbar"
import DropdownApprove from "../../component/dropdown/DropdownApprove"
import { useQuery } from "react-query"
import { API } from "../../confiq/api"
import { UserContext } from "../../context/UserContext"

const style = {
  header: {
    color: "white",
  },

  headerTable: {
    color: "#EE4622",
  },

  active: {
    color: "#0ACF83",
  },

  pending: {
    color: "#F7941E",
  },

  notActive: {
    color: "#FF0000",
  },
}

function Income() {
  const [state, dispatch] = useContext(UserContext)
  let { data: transall, refetch } = useQuery("TransTable", async () => {
    if (state.user.status === "admin") {
      const response = await API.get("/transactions")
      return response.data.data
    }
  })

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
  let income = 0

  return (
    <>
      <Navs />
      <Container className="my-5">
        <h4 className="my-5" style={style.header}>
          Incoming Transaction
        </h4>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th style={style.headerTable}>No</th>
              <th style={style.headerTable}>Users</th>
              <th style={style.headerTable}>Remaining Active</th>
              <th style={style.headerTable}>Status User</th>
              <th style={style.headerTable}>Status Payment</th>
            </tr>
          </thead>
          <tbody>
            {transall === 0 ? (
              <tr>
                <td colSpan={6}>Not Transaction</td>
              </tr>
            ) : (
              transall?.map((element, number) => {
                number += 1
                if (element.status === "success") {
                  income += element.price
                }

                return (
                  <tr>
                    <th>{number}</th>
                    <th>{element.user.fullname}</th>
                    <th>30 hari</th>
                    <th>
                      <label style={style.active}>Active</label>
                      <label style={style.notActive}>Not Active</label>
                    </th>
                    <th>
                      {element.status === "pending" ? (
                        <label style={style.pending}>Pending</label>
                      ) : element.status === "success" ? (
                        <label style={style.active}>Success</label>
                      ) : element.status === "cancel" ? (
                        <label style={style.notActive}>Cancel</label>
                      ) : null}
                    </th>
                  </tr>
                )
              })
            )}
            <tr>
              <td style={style.headerTable} colSpan={6}>
                Income : {formatIDR.format(income)}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default Income
