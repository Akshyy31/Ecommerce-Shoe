import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../contextapi/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const { registerUser } = useContext(AuthContext);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "user",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
      registerUser(values);
    },
  });

  return (
    <div>
      <Container className="py-2 bg-light" style={{ height: "500px" }}>
        <Row className="d-flex justify-content-center align-items-center">
          <Col>
            <Card className="card-registration my-4">
              <Row className="g-0">
                {/* Left Image Section */}
                <Col md={6} className="d-none d-xl-block">
                  <img
                    src="https://cdn.dribbble.com/userupload/31820057/file/original-f00df735e0ae8b12b596efe4e7d1d5f3.png"
                    alt="Sample"
                    className="img-fluid"
                    style={{ height: "620px", width: "700px" }}
                  />
                </Col>

                {/* Form Section */}
                <Col md={6} style={{ height: "620px", width: "700px" }}>
                  <Card.Body className="p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Registration Form</h3>
                    <Form onSubmit={formik.handleSubmit}>
                      <Form.Group controlId="username" className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          size="lg"
                          type="text"
                          name="username"
                          required
                          value={formik.values.username}
                          onChange={formik.handleChange}
                        />
                      </Form.Group>

                      <Form.Group controlId="email" className="mb-4">
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control
                          size="lg"
                          type="email"
                          name="email"
                          required
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          isInvalid={
                            formik.touched.email && !!formik.errors.email
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="password" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          size="lg"
                          type="password"
                          name="password"
                          required
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          isInvalid={
                            formik.touched.password && !!formik.errors.password
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Optional: Hidden role field (or dropdown if needed) */}
                      <Form.Control
                        type="hidden"
                        name="role"
                        value={formik.values.role}
                      />

                      <div className="d-flex justify-content-end">
                        <Button
                          type="submit"
                          variant="success"
                          size="lg"
                          className="m-2"
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
