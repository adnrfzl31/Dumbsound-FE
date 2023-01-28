import { Modal, Button } from "react-bootstrap"

const style = {
  header: {
    fontSize: "20px",
    fontWeight: "900",
    color: "white",
  },

  text: {
    fontSize: "16px",
    fontWeight: "500",
    color: "white",
  },

  btn: {
    width: "135px",
  },
}

export default function DeleteData({ show, handleClose, setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true)
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="bg-dark">
        <h2 style={style.header}>Delete Data</h2>
        <p style={style.text} className="mt-2">
          Are you sure you want to delete this data?
        </p>
        <div className="text-end mt-5">
          <Button
            onClick={handleDelete}
            size="sm"
            className="btn-success me-2"
            style={style.btn}
          >
            Yes
          </Button>
          <Button
            onClick={handleClose}
            size="sm"
            className="btn-danger"
            style={style.btn}
          >
            No
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
