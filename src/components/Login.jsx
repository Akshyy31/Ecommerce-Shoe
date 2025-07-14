import { Row, Col, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { User, X } from "lucide-react";
import AuthContext from "../contextapi/AuthContext";
import { toast } from "react-toastify";

function Login({ show, handleClose, hideIcon = false }) {

  const [internalShow, setInternalShow] = useState(false);
  const modalVisible = show !== undefined ? show : internalShow;
  const { loginUser } = useContext(AuthContext);



  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Please fill both email and password.");
      return;
    } else {
      loginUser(email,password);
    }

    if (handleClose) {
      handleClose();
    } else {
      setInternalShow(false);
    }
  };

  const closeModal = () => {
    if (handleClose) {
      handleClose();
    } else {
      setInternalShow(false);
    }
  };

  return (
    <>
      {!hideIcon && (
        <button
          className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium flex items-center"
          onClick={() => setInternalShow(true)}
        >
          <User size={24} color="black" />
        </button>
      )}

      <Modal
        show={modalVisible}
        onHide={closeModal}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Body className="p-0">
          <Row className="g-0" style={{ height: "470px" }}>
            {/* Left Image */}
            <Col md={6} className="d-none d-md-block">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=jpg&q=60&w=1000"
                alt="login"
                className="img-fluid h-100 w-100"
                style={{ objectFit: "cover", height: "400px" }}
              />
            </Col>

            {/* Right Form */}
            <Col xs={12} md={6} className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="mb-0">Login</h3>
                <span className="cursor-pointer" onClick={closeModal}>
                  <X />
                </span>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100 mb-3">
                  Login
                </Button>

                <p className="text-center">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
